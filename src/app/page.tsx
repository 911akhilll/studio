'use client';
import { useEffect } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Footer from '@/components/footer';
import ScrollingStar from '@/components/scrolling-star';

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <ScrollingStar />
      <Header />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
