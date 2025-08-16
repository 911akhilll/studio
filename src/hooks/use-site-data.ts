'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import type { SiteData } from '@/contexts/site-data-context';

const initialData: SiteData = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://placehold.co/450x300.png',
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(docSnap.data() as SiteData);
      } else {
        setDoc(docRef, initialData);
        setSiteData(initialData);
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSiteData = async (newData: Partial<SiteData>, imageFile?: File | null) => {
    const docRef = doc(db, 'site', 'settings');
    let updatedData = { ...newData };

    if (imageFile) {
        const storageRef = ref(storage, `profileImages/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);
        updatedData.profileImage = downloadURL;
    }
    
    await setDoc(docRef, updatedData, { merge: true });
  };

  return { siteData, loading, updateSiteData };
};
