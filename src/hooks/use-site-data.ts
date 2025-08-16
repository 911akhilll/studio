
'use client';
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc, getDoc } from 'firebase/firestore';
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
    try {
        const collectionRef = collection(db, 'site', 'settings', collectionName);
        const q = query(collectionRef, orderBy(orderByField, orderDirection));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamps to JS Dates for serialization
            Object.keys(data).forEach(key => {
                if (data[key] && typeof data[key].toDate === 'function') {
                    data[key] = data[key].toDate();
                }
            });
            return { id: doc.id, ...data };
        });
    } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        return [];
    }
  }, []);

  // Effect to subscribe to real-time updates for all site data
  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      setLoading(true);
      
      const reviews = await fetchCollection('reviews', 'createdAt', 'desc') as Review[];
      const videos = await fetchCollection('videos', 'title', 'asc') as YouTubeVideo[];
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteData({ ...initialData, ...data, reviews, videos });
      } else {
        console.log("No such document! Creating initial settings.");
        try {
            await setDoc(docRef, { 
                heroTitle: initialData.heroTitle,
                heroSubtitle: initialData.heroSubtitle,
                aboutText: initialData.aboutText,
                contactEmail: initialData.contactEmail
            });
            setSiteData({ ...initialData, reviews, videos });
        } catch (error) {
            console.error("Error creating initial site settings:", error);
        }
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        // In case of error, try to fetch at least once without realtime listener
        getDoc(docRef).then(async (docSnap) => {
            if (docSnap.exists()) {
                const reviews = await fetchCollection('reviews', 'createdAt', 'desc') as Review[];
                const videos = await fetchCollection('videos', 'title', 'asc') as YouTubeVideo[];
                const data = docSnap.data();
                setSiteData({ ...initialData, ...data, reviews, videos });
            } else {
                 setSiteData(initialData); 
            }
        }).catch(err => {
             console.error("Failed to fetch non-realtime data:", err);
             setSiteData(initialData);
        }).finally(() => {
            setLoading(false);
        });
    });

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
  };

  // Explicit function to delete a review, which removes it from Firebase
  const deleteReview = async (reviewId: string) => {
    await deleteDocFromCollection('reviews', reviewId);
  }

  // Explicit function to add a video, which persists it to Firebase
  const addVideo = async (newVideo: Omit<YouTubeVideo, 'id'>) => {
    await addDocToCollection('videos', newVideo);
  }

  // Explicit function to delete a video, which removes it from Firebase
  const deleteVideo = async (videoId: string) => {
    await deleteDocFromCollection('videos', videoId);
  }

  return { siteData, loading, updateSiteData, addReview, deleteReview, addVideo, deleteVideo };
};

    