import React from 'react';
import { Button } from './ui/button';
import StaticImage from './static-image';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-primary text-foreground pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
            <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tighter uppercase">
                Hyrexverse
            </h1>
            <p className="mt-4 text-2xl md:text-3xl font-bold">
                A design agency....kinda
            </p>
            <p className="mt-2 max-w-xl mx-auto md:mx-0 text-lg">
                Unlimited revisions and a flat monthly fee.
            </p>
            <Button size="lg" className="mt-8 bg-orange-500 text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-orange-600 transition-all">
                See Plans
            </Button>
        </div>
        <div className="relative h-64 md:h-full">
            <StaticImage 
                src="https://placehold.co/600x600.png" 
                alt="Robot illustration"
                data-ai-hint="robot illustration"
                layout="fill"
                objectFit="contain"
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
