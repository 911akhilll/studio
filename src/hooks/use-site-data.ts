
'use client';
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, collection, addDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
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

  // Effect for main site settings
  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteData(prev => ({
          ...prev,
          heroTitle: data.heroTitle || initialData.heroTitle,
          heroSubtitle: data.heroSubtitle || initialData.heroSubtitle,
          aboutText: data.aboutText || initialData.aboutText,
          contactEmail: data.contactEmail || initialData.contactEmail,
        }));
      } else {
        // If the document doesn't exist, create it with initial values
        setDoc(docRef, { 
            heroTitle: initialData.heroTitle,
            heroSubtitle: initialData.heroSubtitle,
            aboutText: initialData.aboutText,
            contactEmail: initialData.contactEmail
        }).catch(err => console.error("Error creating initial settings:", err));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching site settings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Effect for reviews sub-collection
  useEffect(() => {
    const reviewsRef = collection(db, 'site', 'settings', 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviews = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          rating: data.rating,
          text: data.text,
          createdAt: data.createdAt.toDate(),
        } as Review;
      });
      setSiteData(prev => ({ ...prev, reviews }));
    }, (error) => {
      console.error("Error fetching reviews:", error);
    });

    return () => unsubscribe();
  }, []);

  // Effect for videos sub-collection
  useEffect(() => {
    const videosRef = collection(db, 'site', 'settings', 'videos');
    const q = query(videosRef, orderBy('title', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const videos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as YouTubeVideo));
        setSiteData(prev => ({ ...prev, videos }));
    }, (error) => {
        console.error("Error fetching videos:", error);
    });

    return () => unsubscribe();
  }, []);

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews' | 'videos'>>) => {
    const docRef = doc(db, 'site', 'settings');
    await setDoc(docRef, newData, { merge: true });
  };
  
  const addReview = async (newReview: Omit<Review, 'id'>) => {
    await addDoc(collection(db, 'site', 'settings', 'reviews'), newReview);
  };

  const deleteReview = async (reviewId: string) => {
    await deleteDoc(doc(db, 'site', 'settings', 'reviews', reviewId));
  }

  const addVideo = async (newVideo: Omit<YouTubeVideo, 'id'>) => {
    await addDoc(collection(db, 'site', 'settings', 'videos'), newVideo);
  }

  const deleteVideo = async (videoId: string) => {
    await deleteDoc(doc(db, 'site', 'settings', 'videos', videoId));
  }

  return { siteData, loading, updateSiteData, addReview, deleteReview, addVideo, deleteVideo };
};
