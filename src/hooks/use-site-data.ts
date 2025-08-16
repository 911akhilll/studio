'use client';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { SiteData } from '@/contexts/site-data-context';

const initialData: SiteData = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://i.ibb.co/r29pk6ph/profileimg.png',
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);
  const isUploading = false; // No more uploads

  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSiteData({ ...initialData, ...data });
      } else {
        setDoc(docRef, initialData).then(() => {
          setSiteData(initialData);
        });
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setSiteData(initialData);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage'>>) => {
    const docRef = doc(db, 'site', 'settings');
    const dataToUpdate = { ...newData };
    await setDoc(docRef, dataToUpdate, { merge: true });
  };

  return { siteData, loading, isUploading, updateSiteData };
};
