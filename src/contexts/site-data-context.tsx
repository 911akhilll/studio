'use client';

import React, { createContext, useContext, useState } from 'react';
import { useSiteData } from '@/hooks/use-site-data';

export interface SiteData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImage: string;
}

interface SiteDataContextType {
  siteData: SiteData;
  loading: boolean;
  isUploading: boolean;
  updateSiteData: (newData: Partial<Omit<SiteData, 'profileImage'>>) => Promise<void>;
  isAdminPanelOpen: boolean;
  setAdminPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { siteData, loading, isUploading, updateSiteData } = useSiteData();
  const [isAdminPanelOpen, setAdminPanelOpen] = useState(false);

  return (
    <SiteDataContext.Provider value={{ siteData, loading, isUploading, updateSiteData, isAdminPanelOpen, setAdminPanelOpen }}>
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
