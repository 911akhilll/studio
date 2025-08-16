'use client';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
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
  const [isUploading, setIsUploading] = useState(false);

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

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage'>>, imageFile?: File | null) => {
    const docRef = doc(db, 'site', 'settings');
    
    // Immediately update text data
    if (Object.keys(newData).length > 0) {
      await setDoc(docRef, newData, { merge: true });
    }

    if (imageFile) {
        setIsUploading(true);
        
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }

        try {
            const compressedFile = await imageCompression(imageFile, options);
            const storageRef = ref(storage, `profileImages/${compressedFile.name}`);
            await uploadBytes(storageRef, compressedFile);
            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(docRef, { profileImage: downloadURL }, { merge: true });
        } catch (error) {
            console.error("Error uploading image: ", error);
        } finally {
            setIsUploading(false);
        }
    }
  };

  return { siteData, loading, isUploading, updateSiteData };
};
