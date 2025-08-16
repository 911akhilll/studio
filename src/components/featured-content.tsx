'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';

const FeaturedContent = () => {
  const { siteData } = useSiteDataContext();

  if (!siteData.embeddedHtml) {
    return null;
  }

  return (
    <section id="featured-content" className="py-24 sm:py-32 bg-secondary text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">Featured Content</h2>
        <div 
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          dangerouslySetInnerHTML={{ __html: siteData.embeddedHtml }} 
        />
      </div>
    </section>
  );
};

export default FeaturedContent;
