
'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

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


  return (
    <AdminContext.Provider value={{ 
      isOpen, setOpen, 
      isAuthenticated, setAuthenticated,
      heroTitle, setHeroTitle,
      heroSubtitle, setHeroSubtitle,
      aboutText, setAboutText,
      profileImage, setProfileImage
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
