'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import Image from 'next/image';

const About = () => {
  const { siteData } = useSiteDataContext();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <p className="mt-4 text-lg text-black/80">
                    {siteData.aboutText}
                </p>
            </div>
            <div className="order-1 md:order-2">
                {siteData.profileImage && (
                  <div className="relative w-full h-80">
                    <Image 
                        src={siteData.profileImage}
                        alt="Profile image"
                        data-ai-hint="profile"
                        layout="fill"
                        className="rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] object-cover"
                    />
                  </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
