'use client';
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { SiteData } from '@/contexts/site-data-context';

export interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface YouTubeVideo {
    id: string;
    title: string;
    url: string;
}

const initialData: SiteData = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://i.ibb.co/r29pk6ph/profileimg.png',
    contactEmail: '911priyatambehera@gmail.com',
    reviews: [],
    videos: [],
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  // Generic function to fetch a collection's data
  const fetchCollection = useCallback(async (collectionName: string, orderByField: string, orderDirection: 'asc' | 'desc' = 'desc') => {
    const collectionRef = collection(db, 'site', 'settings', collectionName);
    const q = query(collectionRef, orderBy(orderByField, orderDirection));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore Timestamps to JS Dates for serialization
      Object.keys(data).forEach(key => {
        if (data[key]?.toDate) {
          data[key] = data[key].toDate();
        }
      });
      return { id: doc.id, ...data };
    });
  }, []);

  // Effect to subscribe to real-time updates for all site data
  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    
    // onSnapshot listens for real-time changes to the document
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      setLoading(true);
      
      // Fetch related collections like reviews and videos
      const reviews = await fetchCollection('reviews', 'createdAt', 'desc') as Review[];
      const videos = await fetchCollection('videos', 'title', 'asc') as YouTubeVideo[];
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Combine the main document data with collection data
        setSiteData({ ...initialData, ...data, reviews, videos });
      } else {
        // If no data exists, create the initial document
        await setDoc(docRef, initialData);
        setSiteData({ ...initialData, reviews, videos });
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setSiteData(initialData); // Fallback to initial data on error
        setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [fetchCollection]);

  // Function to update the main site settings document
  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews' | 'videos'>>) => {
    const docRef = doc(db, 'site', 'settings');
    await setDoc(docRef, newData, { merge: true });
  };

  // Generic function to add a document to a sub-collection
  const addDocToCollection = async (collectionName: string, data: object) => {
      const collectionRef = collection(db, 'site', 'settings', collectionName);
      await addDoc(collectionRef, data);
  }

  // Generic function to delete a document from a sub-collection
  const deleteDocFromCollection = async (collectionName: string, docId: string) => {
      const docRef = doc(db, 'site', 'settings', collectionName, docId);
      await deleteDoc(docRef);
  }
  
  // Explicit function to add a review, which persists it to Firebase
  const addReview = async (newReview: Omit<Review, 'id'>) => {
    await addDocToCollection('reviews', newReview);
    // onSnapshot will automatically update the UI, no manual refresh needed
  };

  // Explicit function to delete a review, which removes it from Firebase
  const deleteReview = async (reviewId: string) => {
    await deleteDocFromCollection('reviews', reviewId);
    // onSnapshot will automatically update the UI
  }

  // Explicit function to add a video, which persists it to Firebase
  const addVideo = async (newVideo: Omit<YouTubeVideo, 'id'>) => {
    await addDocToCollection('videos', newVideo);
    // onSnapshot will automatically update the UI
  }

  // Explicit function to delete a video, which removes it from Firebase
  const deleteVideo = async (videoId: string) => {
    await deleteDocFromCollection('videos', videoId);
    // onSnapshot will automatically update the UI
  }

  return { siteData, loading, updateSiteData, addReview, deleteReview, addVideo, deleteVideo };
};
