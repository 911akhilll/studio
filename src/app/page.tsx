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
import YouTubeVideos from '@/components/youtube-videos';


const PageContent = () => {
  return (
    <div className="bg-secondary min-h-screen text-black overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <YouTubeVideos />
        <Portfolio />
        <Testimonials />
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
