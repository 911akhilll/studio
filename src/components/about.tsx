import React from 'react';
import StaticImage from './static-image';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <StaticImage 
                src="https://placehold.co/600x400.png"
                alt="Priyatam Behera at workstation"
                data-ai-hint="developer designer"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter font-display">About Me</h2>
            <p className="mt-4 text-lg text-foreground/80">
                I'm Priyatam Behera, a passionate and versatile creative professional. With a strong foundation in both website development and graphic design, I build and beautify digital experiences. My journey has also led me to the dynamic worlds of social media influencing and YouTube content creation, where I share my knowledge and connect with a growing community. I thrive on blending technical skill with creative vision to deliver unique and impactful results.
            </p>
        </div>
      </div>
    </section>
  );
};

export default About;
