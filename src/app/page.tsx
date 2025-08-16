'use client';
import React from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { SiteDataProvider } from '@/contexts/site-data-context';
import Testimonials from '@/components/testimonials';
import FeaturedContent from '@/components/featured-content';


const PageContent = () => {
  return (
    <div className="bg-secondary min-h-screen text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <FeaturedContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <SiteDataProvider>
      <PageContent />
    </SiteDataProvider>
  );
}
