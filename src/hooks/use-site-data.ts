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

  const updateSiteData = async (newData: Partial<Omit<SiteData, 'profileImage'>>, imageFile?: File | null) => {
    const docRef = doc(db, 'site', 'settings');
    
    // Create a temporary object to hold all updates
    const dataToUpdate: Partial<SiteData> = { ...newData };

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
            dataToUpdate.profileImage = await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Error uploading image: ", error);
            setIsUploading(false); // Stop loading indicator on error
            return; // Exit without setting document if upload fails
        } finally {
            setIsUploading(false);
        }
    } else if (newData.profileImage) {
        // If a new URL is provided directly in newData, it will be saved.
        // This handles the URL paste case.
        dataToUpdate.profileImage = newData.profileImage;
    }

    // Perform a single write operation with all merged data
    if (Object.keys(dataToUpdate).length > 0) {
      await setDoc(docRef, dataToUpdate, { merge: true });
    }
  };

  return { siteData, loading, isUploading, updateSiteData };
};
