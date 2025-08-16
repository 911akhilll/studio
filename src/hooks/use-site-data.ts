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

  const fetchCollection = useCallback(async (collectionName: string, orderByField: string, orderDirection: 'asc' | 'desc' = 'desc') => {
    const collectionRef = collection(db, 'site', 'settings', collectionName);
    const q = query(collectionRef, orderBy(orderByField, orderDirection));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore Timestamps to JS Dates
      Object.keys(data).forEach(key => {
        if (data[key]?.toDate) {
          data[key] = data[key].toDate();
        }
      });
      return { id: doc.id, ...data };
    });
  }, []);

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
        await setDoc(docRef, initialData);
        setSiteData({ ...initialData, reviews, videos });
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setSiteData(initialData);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchCollection]);

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews' | 'videos'>>) => {
    const docRef = doc(db, 'site', 'settings');
    const dataToUpdate = { ...newData };
    await setDoc(docRef, dataToUpdate, { merge: true });
  };

  const addDocToCollection = async (collectionName: string, data: object) => {
      const collectionRef = collection(db, 'site', 'settings', collectionName);
      await addDoc(collectionRef, data);
  }

  const deleteDocFromCollection = async (collectionName: string, docId: string) => {
      const docRef = doc(db, 'site', 'settings', collectionName, docId);
      await deleteDoc(docRef);
  }

  const refreshData = async () => {
      const reviews = await fetchCollection('reviews', 'createdAt', 'desc') as Review[];
      const videos = await fetchCollection('videos', 'title', 'asc') as YouTubeVideo[];
      setSiteData(prev => ({ ...prev, reviews, videos }));
  }

  const addReview = async (newReview: Omit<Review, 'id'>) => {
    await addDocToCollection('reviews', newReview);
    await refreshData();
  };

  const deleteReview = async (reviewId: string) => {
    await deleteDocFromCollection('reviews', reviewId);
    await refreshData();
  }

  const addVideo = async (newVideo: Omit<YouTubeVideo, 'id'>) => {
    await addDocToCollection('videos', newVideo);
    await refreshData();
  }

  const deleteVideo = async (videoId: string) => {
    await deleteDocFromCollection('videos', videoId);
    await refreshData();
  }

  return { siteData, loading, updateSiteData, addReview, deleteReview, addVideo, deleteVideo };
};
