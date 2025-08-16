'use client';
import React, { useEffect, useRef } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { AdminProvider, useAdmin } from '@/context/admin-context';
import AdminPanel from '@/components/admin-panel';

const PageContent = () => {
  const { useAnimation } = useAdmin();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!useAnimation) {
      sectionsRef.current.forEach(section => {
        if (section) {
          section.classList.remove('fade-in-section', 'is-visible');
        }
      });
      return;
    }

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
  }, [useAnimation]);

  return (
    <div className="bg-secondary min-h-screen text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <div ref={(el) => (sectionsRef.current[0] = el)}>
          <About />
        </div>
        <div ref={(el) => (sections.current[1] = el)}>
          <Services />
        </div>
        <div ref={(el) => (sections.current[2] = el)}>
          <Portfolio />
        </div>
        <Contact />
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
};

export default function Home() {
  return (
    <AdminProvider>
      <PageContent />
    </AdminProvider>
  );
}
