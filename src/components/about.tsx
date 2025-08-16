'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';

const About = () => {
  const { siteData, loading } = useSiteDataContext();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                {loading ? (
                  <div className='space-y-2'>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : (
                  <p className="mt-4 text-lg text-black/80">
                      {siteData.aboutText}
                  </p>
                )}
            </div>
            <div className="order-1 md:order-2">
                {loading ? (
                  <Skeleton className="w-[450px] h-[300px] rounded-lg" />
                ) : (
                  siteData.profileImage && (
                    <Image 
                        src={siteData.profileImage}
                        alt="Domi boy anime"
                        data-ai-hint="anime boy"
                        width={450}
                        height={300}
                        className="rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] object-cover"
                    />
                  )
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
