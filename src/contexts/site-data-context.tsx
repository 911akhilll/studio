'use client';
import React, { createContext, useContext } from 'react';
import { useSiteData, Review, YouTubeVideo } from '@/hooks/use-site-data';

export interface SiteData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImage: string;
  contactEmail: string;
  reviews: Review[];
  videos: YouTubeVideo[];
}

interface SiteDataContextType {
  siteData: SiteData;
  loading: boolean;
  updateSiteData: (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews' | 'videos'>>) => Promise<void>;
  addReview: (newReview: Omit<Review, 'id'>) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  addVideo: (newVideo: Omit<YouTubeVideo, 'id'>) => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const siteDataHook = useSiteData();

  return (
    <SiteDataContext.Provider value={siteDataHook}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteDataContext = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteDataContext must be used within a SiteDataProvider');
  }
  return context;
};
