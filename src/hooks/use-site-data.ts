
'use client';
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, collection, addDoc, query, orderBy, deleteDoc, Timestamp } from 'firebase/firestore';
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

const initialSettings = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://i.ibb.co/HpVtCDGk/profileimg.png',
    contactEmail: '911priyatambehera@gmail.com',
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>({ ...initialSettings, reviews: [], videos: [] });
  const [loading, setLoading] = useState(true);

  // Effect for main site settings
  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
         setSiteData(prev => ({
          ...prev,
          heroTitle: data.heroTitle || initialSettings.heroTitle,
          heroSubtitle: data.heroSubtitle || initialSettings.heroSubtitle,
          aboutText: data.aboutText || initialSettings.aboutText,
          contactEmail: data.contactEmail || initialSettings.contactEmail,
          profileImage: data.profileImage || initialSettings.profileImage,
        }));
      } else {
         setDoc(docRef, initialSettings, { merge: true }).catch(err => console.error("Error creating initial settings:", err));
         setSiteData(prev => ({ ...prev, ...initialSettings }));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching site settings:", error);
      setSiteData(prev => ({ ...prev, ...initialSettings }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Effect for reviews sub-collection
  useEffect(() => {
    const reviewsRef = collection(db, 'site', 'settings', 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedReviews = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          rating: data.rating,
          text: data.text,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
        } as Review;
      });
      setSiteData(prev => ({...prev, reviews: fetchedReviews}));
    }, (error) => {
      console.error("Error fetching reviews:", error);
       setSiteData(prev => ({...prev, reviews: []}));
    });

    return () => unsubscribe();
  }, []);

  // Effect for videos sub-collection
  useEffect(() => {
    const videosRef = collection(db, 'site', 'settings', 'videos');
    const q = query(videosRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedVideos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as YouTubeVideo));
        setSiteData(prev => ({...prev, videos: fetchedVideos}));
    }, (error) => {
        console.error("Error fetching videos:", error);
        setSiteData(prev => ({...prev, videos: []}));
    });

    return () => unsubscribe();
  }, []);

  const updateSiteData = useCallback(async (newData: Partial<Omit<SiteData, 'reviews' | 'videos'>>) => {
    const docRef = doc(db, 'site', 'settings');
    try {
      // Ensure profileImage is not part of the update
      const { profileImage, ...dataToUpdate } = newData;
      await setDoc(docRef, dataToUpdate, { merge: true });
    } catch (error) {
      console.error("Error updating site data: ", error);
    }
  }, []);

  const addReview = useCallback(async (newReview: Omit<Review, 'id'>) => {
    try {
      await addDoc(collection(db, 'site', 'settings', 'reviews'), {
          ...newReview,
          createdAt: Timestamp.fromDate(newReview.createdAt)
      });
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  }, []);

  const deleteReview = useCallback(async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'site', 'settings', 'reviews', reviewId));
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  }, []);

  const addVideo = useCallback(async (newVideo: Omit<YouTubeVideo, 'id'>) => {
    try {
      await addDoc(collection(db, 'site', 'settings', 'videos'), newVideo);
    } catch (error) {
      console.error("Error adding video: ", error);
    }
  }, []);

  const deleteVideo = useCallback(async (videoId: string) => {
    try {
      await deleteDoc(doc(db, 'site', 'settings', 'videos', videoId));
    } catch (error) {
      console.error("Error deleting video: ", error);
    }
  }, []);

  return { siteData, loading, updateSiteData, addReview, deleteReview, addVideo, deleteVideo };
};
