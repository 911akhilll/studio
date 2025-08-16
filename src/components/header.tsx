
'use client';
import React, { useState, useRef } from 'react';
import { useAdmin } from '@/context/admin-context';

const Header = () => {
  const { setOpen } = useAdmin();
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setOpen(true);
    }, 1500); // 1.5 seconds for long press
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      setOpen(true);
    }, 1500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };


  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="text-2xl font-black tracking-tighter focus:outline-none"
            // Prevent context menu on long press
            onContextMenu={(e) => e.preventDefault()}
          >
            HYREXVERSE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
