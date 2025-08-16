"use client";

import { useState, useEffect, useRef } from 'react';

const ScrollingStar = () => {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const star = starRef.current;
      if (!star) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);

      const isHeroVisible = scrollY < windowHeight;

      if (isHeroVisible) {
        // In Hero section
        const heroScroll = scrollY / windowHeight;
        const top = 10 + heroScroll * 60; // Move down
        const left = 50 + heroScroll * 30; // Move right
        const scale = 1 + heroScroll * 0.5; // Grow
        const rotation = heroScroll * 90; // Rotate
        star.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.opacity = '1';
      } else {
        // In Projects section
        const projectScroll = (scrollY - windowHeight) / (docHeight - windowHeight);
        const top = 70 - projectScroll * 60; // Move up
        const left = 20 + projectScroll * -10; // Move left
        const scale = 1.5 - projectScroll * 1; // Shrink
        const rotation = 90 + projectScroll * 270; // Continue rotating
        star.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.opacity = `${1 - projectScroll * 2}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={starRef}
      className="pointer-events-none fixed z-50 transition-all duration-500 ease-out"
      style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-primary slow-spin"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
      </svg>
    </div>
  );
};

export default ScrollingStar;
