'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';

const About = () => {
  const { siteData } = useSiteDataContext();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">About Me</h2>
            <p className="mt-4 text-lg text-black/80">
                {siteData.aboutText}
            </p>
        </div>
      </div>
    </section>
  );
};

export default About;
