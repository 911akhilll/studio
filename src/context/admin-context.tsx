
'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AdminContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AdminContext.Provider value={{ isOpen, setOpen, isAuthenticated, setAuthenticated }}>
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
