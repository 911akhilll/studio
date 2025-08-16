"use client";

import { useState, useEffect, useRef } from 'react';

const ScrollingStar = () => {
  const starRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const star = starRef.current;
      if (!star) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const heroSection = document.getElementById('hero');
      const projectsSection = document.getElementById('projects');
      const heroActionButton = document.getElementById('hero-action-button');
      const scrollDownButton = document.getElementById('scroll-down-button');
      const projectCard1 = document.getElementById('project-card-1');

      let targetElement = null;

      const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 0;
      const projectsTop = projectsSection ? projectsSection.offsetTop : docHeight;

      if (scrollY < heroBottom - windowHeight / 1.5) {
        // Star points to hero action button
        targetElement = heroActionButton;
      } else if (scrollY < projectsTop - windowHeight / 1.5) {
        // Star points to scroll down button
        targetElement = scrollDownButton;
      } else {
        // Star points to first project card
        targetElement = projectCard1;
      }

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const top = rect.top + window.scrollY + rect.height / 2;
        const left = rect.left + window.scrollX + rect.width / 2;
        
        const isProjectCard = targetElement.id.includes('project-card');

        setStyles({
          top: `${top}px`,
          left: `${left + (isProjectCard ? -40 : 40)}px`,
          transform: `translate(-50%, -50%) scale(1.5) rotate(${scrollY / 5}deg)`,
          opacity: '1',
        });
      } else {
         // Fallback position if no target is found
         const scrollPercent = scrollY / (docHeight - windowHeight);
         const top = 50 + scrollPercent * 20;
         const left = 50 - scrollPercent * 20;
         setStyles({
           top: `${top}%`,
           left: `${left}%`,
           transform: `translate(-50%, -50%) scale(1) rotate(${scrollY / 5}deg)`,
           opacity: '0.8'
         });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on mount to set initial position
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={starRef}
      className="pointer-events-none fixed z-50 transition-all duration-1000 ease-out"
      style={styles}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-primary"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
      </svg>
    </div>
  );
};

export default ScrollingStar;
