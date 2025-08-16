'use client';
import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { SiteData } from '@/contexts/site-data-context';

export interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: Date;
}

const initialData: SiteData = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://i.ibb.co/r29pk6ph/profileimg.png',
    contactEmail: '911priyatambehera@gmail.com',
    embeddedHtml: '<p class="text-center text-lg">You can embed your custom HTML here!</p>',
    reviews: []
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    const reviewsCollection = collection(db, 'site', 'settings', 'reviews');
    const q = query(reviewsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Review[];
    return reviews;
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const reviews = await fetchReviews();
        setSiteData({ ...initialData, ...data, reviews });
      } else {
        setDoc(docRef, initialData).then(async () => {
          const reviews = await fetchReviews();
          setSiteData({ ...initialData, reviews });
        });
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setSiteData(initialData);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchReviews]);

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews'>>) => {
    const docRef = doc(db, 'site', 'settings');
    const dataToUpdate = { ...newData };
    await setDoc(docRef, dataToUpdate, { merge: true });
  };

  const addReview = async (newReview: Omit<Review, 'id'>) => {
    const reviewsCollection = collection(db, 'site', 'settings', 'reviews');
    await addDoc(reviewsCollection, newReview);
    // Re-fetch reviews to update state
    const reviews = await fetchReviews();
    setSiteData(prev => ({...prev, reviews}));
  };

  return { siteData, loading, updateSiteData, addReview };
};
