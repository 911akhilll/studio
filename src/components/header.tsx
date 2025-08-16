'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleNavigateToAdmin = () => {
    router.push('/admin');
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-black tracking-tighter cursor-pointer">
            HYREXVERSE
          </a>
          <div 
            className="text-sm font-bold tracking-tighter cursor-pointer"
            onClick={handleNavigateToAdmin}
            title="Go to Admin Panel"
          >
            Admin
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
