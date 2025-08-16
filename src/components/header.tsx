'use client';
import React, { useRef } from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';

const Header = () => {
  const { setAdminPanelOpen } = useSiteDataContext();
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    longPressTimeout.current = setTimeout(() => {
      setAdminPanelOpen(true);
    }, 1500); // 1.5 seconds
  };

  const handleMouseUp = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  const handleTouchStart = () => {
    longPressTimeout.current = setTimeout(() => {
      setAdminPanelOpen(true);
    }, 1500); // 1.5 seconds
  };

  const handleTouchEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="text-2xl font-black tracking-tighter cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            HYREXVERSE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
