'use client';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { db, storage } from '@/lib/firebase';
import type { SiteData } from '@/contexts/site-data-context';

const initialData: SiteData = {
    heroTitle: 'Hyrexverse',
    heroSubtitle: "I'm a YouTube content creator. Join me now!",
    aboutText: "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!",
    profileImage: 'https://i.ibb.co/68S5gH3/image.png',
};

export const useSiteData = () => {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'site', 'settings');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteData;
        // Ensure profileImage is never null or undefined to prevent errors
        setSiteData({ ...initialData, ...data, profileImage: data.profileImage || initialData.profileImage });
      } else {
        // If the document doesn't exist, create it with initial data
        setDoc(docRef, initialData).then(() => {
          setSiteData(initialData);
        });
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching site data:", error);
        setSiteData(initialData); // Fallback to initial data on error
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage'>> & { profileImage?: string }, imageFile?: File | null) => {
    const docRef = doc(db, 'site', 'settings');
    
    // Create a temporary object to hold all updates, starting with text fields
    const dataToUpdate: Partial<Omit<SiteData, 'profileImage'>> = { 
        heroTitle: newData.heroTitle,
        heroSubtitle: newData.heroSubtitle,
        aboutText: newData.aboutText,
    };

    // First, save the text content immediately for a responsive feel
    await setDoc(docRef, dataToUpdate, { merge: true });

    // Handle image file upload if one is provided
    if (imageFile) {
        setIsUploading(true);
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            const storageRef = ref(storage, `profileImages/${Date.now()}_${compressedFile.name}`);
            await uploadBytes(storageRef, compressedFile);
            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(docRef, { profileImage: downloadURL }, { merge: true });
        } catch (error) {
            console.error("Error uploading image: ", error);
        } finally {
            setIsUploading(false);
        }
    } else if (newData.profileImage && newData.profileImage !== siteData.profileImage) {
        // If a new URL is provided directly and it's different, save it
        await setDoc(docRef, { profileImage: newData.profileImage }, { merge: true });
    }
  };

  return { siteData, loading, isUploading, updateSiteData };
};
