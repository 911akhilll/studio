import React from 'react';
import StaticImage from './static-image';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-80 md:h-96">
            <StaticImage 
                src="https://placehold.co/600x400.png"
                alt="Robot at a workstation"
                data-ai-hint="robot workstation"
                layout="fill"
                objectFit="contain"
            />
        </div>
        <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The future of design services</h2>
            <p className="mt-4 text-lg text-foreground/80">
                Need stunning graphic design, intuitive UI/UX, or eye-catching web design? Welcome home. We're Hyrexverse, your design partner for a flat monthly fee. We're all about delivering good creative in a new way.
            </p>
        </div>
      </div>
    </section>
  );
};

export default About;
