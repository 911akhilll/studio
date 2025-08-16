import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-center text-center text-foreground pt-48 pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
            className="text-6xl md:text-9xl lg:text-[10rem] font-black leading-none tracking-tighter font-display" 
        >
            HYREXVERSE
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            A Modern Creative Portfolio
        </p>
      </div>
    </section>
  );
};

export default Hero;
