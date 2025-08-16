'use client';
import React, { useEffect, useRef } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

const PageContent = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add('fade-in-section');
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="bg-secondary min-h-screen text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <div ref={(el) => (sectionsRef.current[0] = el)}>
          <About />
        </div>
        <div ref={(el) => (sectionsRef.current[1] = el)}>
          <Services />
        </div>
        <div ref={(el) => (sectionsRef.current[2] = el)}>
          <Portfolio />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default function Home() {
  return <PageContent />;
}
