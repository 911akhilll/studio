import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background text-foreground fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-5 lg:col-span-4">
          <div className='flex flex-col items-start'>
            <h1 className="text-9xl md:text-[10rem] font-bold font-display leading-none">Lab.</h1>
            <div className="hidden md:flex items-center space-x-4 mt-12">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className='text-xs'>MENU</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 relative h-[60vh] md:h-[80vh]">
            <div className='absolute inset-0 md:-left-24 md:-right-24'>
                <div className="absolute inset-0 bg-accent z-10 w-1/2 md:w-1/3 right-0 bottom-0 top-auto h-2/3 md:h-1/2"></div>
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://placehold.co/800x1000.png"
                        alt="Model in red jacket"
                        fill
                        className="object-contain object-bottom"
                        data-ai-hint="man fashion"
                        priority
                    />
                </div>
            </div>
            
            <div className='absolute left-4 top-1/2 -translate-y-1/2 hidden md:block'>
                <div className='flex items-center space-x-4 transform -rotate-90'>
                    <span className='text-xs font-bold whitespace-nowrap'>X-LAB</span>
                    <span className='text-xs text-muted-foreground whitespace-nowrap'>MATERIALS OF CREATION</span>
                </div>
            </div>
            
            <div className='absolute bottom-8 right-8 z-20 flex items-center space-x-4'>
                <div className='text-right max-w-xs'>
                    <p className='text-sm font-semibold'>X/LAB®</p>
                    <p className='text-xs text-muted-foreground'>For a new generation of users across different elements, we explore new forms and new ideas</p>
                </div>
                <Button variant='default' size='icon' className='bg-foreground text-background hover:bg-foreground/80 flex-shrink-0'>
                    <ArrowRight />
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
