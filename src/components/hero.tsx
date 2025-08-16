import React from 'react';
import { Button } from './ui/button';
import StaticImage from './static-image';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-primary text-primary-foreground py-24 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase">
                Hyrexverse
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-bold text-black">
                Website Developer | Graphic Designer | Influencer | YouTuber
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                Crafting digital experiences that inspire, engage, and convert. A design subscription so good it should be illegal.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-black text-white rounded-lg shadow-lg hover:bg-black/80 transition-all transform hover:scale-105">
                    <a href="#contact">Get In Touch</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-black border-black rounded-lg shadow-lg hover:bg-black/10 transition-all transform hover:scale-105">
                    <a href="#portfolio">View Work</a>
                </Button>
            </div>
        </div>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full fill-secondary -mb-px">
            <path fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,250.7C384,256,480,224,576,192C672,160,768,128,864,138.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </section>
  );
};

export default Hero;
