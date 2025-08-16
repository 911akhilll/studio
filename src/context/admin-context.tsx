
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AdminContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  heroTitle: string;
  setHeroTitle: (title: string) => void;
  heroSubtitle: string;
  setHeroSubtitle: (subtitle: string) => void;
  aboutText: string;
  setAboutText: (text: string) => void;
  profileImage: string;
  setProfileImage: (imageUrl: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  useAnimation: boolean;
  setUseAnimation: (use: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  // Default content states
  const [heroTitle, setHeroTitle] = useState('Hyrexverse');
  const [heroSubtitle, setHeroSubtitle] = useState("I'm a YouTube content creator. Join me now!");
  const [aboutText, setAboutText] = useState("I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!");
  const [profileImage, setProfileImage] = useState('https://placehold.co/450x300.png');

  // Default color states (from globals.css)
  const [primaryColor, setPrimaryColor] = useState('346.8 77.2% 49.8%');
  const [secondaryColor, setSecondaryColor] = useState('48 96.5% 53.1%');
  const [backgroundColor, setBackgroundColor] = useState('240 10% 3.9%');
  const [textColor, setTextColor] = useState('0 0% 98%');
  
  // Animation state
  const [useAnimation, setUseAnimation] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--primary', primaryColor);
      document.documentElement.style.setProperty('--secondary', secondaryColor);
      document.documentElement.style.setProperty('--background', backgroundColor);
      document.documentElement.style.setProperty('--foreground', textColor);
    }
  }, [primaryColor, secondaryColor, backgroundColor, textColor]);


  return (
    <AdminContext.Provider value={{ 
      isOpen, setOpen, 
      isAuthenticated, setAuthenticated,
      heroTitle, setHeroTitle,
      heroSubtitle, setHeroSubtitle,
      aboutText, setAboutText,
      profileImage, setProfileImage,
      primaryColor, setPrimaryColor,
      secondaryColor, setSecondaryColor,
      backgroundColor, setBackgroundColor,
      textColor, setTextColor,
      useAnimation, setUseAnimation,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
