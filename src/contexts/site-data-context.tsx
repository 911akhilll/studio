'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSiteData, Review } from '@/hooks/use-site-data';

export interface SiteData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImage: string;
  contactEmail: string;
  embeddedHtml: string;
  reviews: Review[];
}

interface SiteDataContextType {
  siteData: SiteData;
  loading: boolean;
  updateSiteData: (newData: Partial<Omit<SiteData, 'profileImage' | 'reviews'>>) => Promise<void>;
  addReview: (newReview: Omit<Review, 'id'>) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { siteData, loading, updateSiteData, addReview } = useSiteData();

  return (
    <SiteDataContext.Provider value={{ siteData, loading, updateSiteData, addReview }}>
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
