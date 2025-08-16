import React from 'react';
import { Button } from './ui/button';
import StaticImage from './static-image';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-primary text-primary-foreground pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-800 to-background opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase font-display">
                    Priyatam Behera
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-bold text-accent">
                    Website Developer | Graphic Designer | Influencer | YouTuber
                </p>
                <p className="mt-4 max-w-xl mx-auto md:mx-0 text-lg text-primary-foreground/80">
                    Crafting digital experiences that inspire, engage, and convert.
                </p>
                <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground rounded-lg shadow-lg hover:bg-accent/90 transition-all transform hover:scale-105">
                    <a href="#contact">Get In Touch</a>
                </Button>
            </div>
            <div className="relative h-64 md:h-96">
                <StaticImage 
                    src="https://placehold.co/600x600.png" 
                    alt="Priyatam Behera Profile Picture"
                    data-ai-hint="man portrait"
                    layout="fill"
                    objectFit="contain"
                    className="drop-shadow-2xl"
                />
            </div>
        </div>
    </section>
  );
};

export default Hero;
