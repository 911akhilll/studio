"use client";

import { useState, useEffect, useRef } from 'react';

const ScrollingStar = () => {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const star = starRef.current;
      if (!star) return;

      const scrollY = window.scrollY;
      const rotation = scrollY / 5;
      
      star.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    };

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
        handleScroll();
        ticking = false;
    };

    const onScroll = () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    };


    window.addEventListener('scroll', onScroll, { passive: true });
    // Run on mount to set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={starRef}
      className="pointer-events-none fixed z-50 transition-transform duration-300 ease-out top-1/2 left-1/2"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-primary/50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
      </svg>
    </div>
  );
};

export default ScrollingStar;
