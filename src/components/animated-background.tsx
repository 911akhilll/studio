"use client";

import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollY = window.scrollY;
      const rotation = scrollY / 20;
      const shapes = container.querySelectorAll('.shape');

      shapes.forEach((shape, i) => {
        const el = shape as HTMLElement;
        const speed = parseFloat(el.dataset.speed || '1');
        const direction = i % 2 === 0 ? 1 : -1;
        
        el.style.transform = `translateY(${scrollY * speed * 0.1}px) rotate(${rotation * direction}deg)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Shapes */}
      <div 
        className="shape absolute top-[10%] left-[10%] w-32 h-32 bg-primary/20 rounded-full filter blur-2xl" 
        data-speed="0.5"
      ></div>
      <div 
        className="shape absolute top-[20%] right-[15%] w-48 h-48 bg-accent/10 rounded-full filter blur-3xl"
        data-speed="0.8"
      ></div>
      <div 
        className="shape absolute bottom-[25%] left-[20%] w-24 h-24 border-2 border-accent/30 rounded-lg animate-pulse" 
        data-speed="-0.3"
      ></div>
      <div 
        className="shape absolute bottom-[10%] right-[10%] w-40 h-40 bg-primary/10 rounded-full filter blur-2xl" 
        data-speed="0.6"
      ></div>
       <div 
        className="shape absolute top-[50%] left-[45%] w-20 h-20 border border-foreground/10 animate-spin-slow" 
        data-speed="0.2"
      ></div>
      <div 
        className="shape absolute top-[70%] left-[5%] w-20 h-20 bg-accent/10 rounded-full filter blur-xl"
        data-speed="0.9"
      ></div>
    </div>
  );
};

export default AnimatedBackground;
