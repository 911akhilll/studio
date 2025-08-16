import StaticImage from './static-image';
import React from 'react';

const About = () => {
  return (
    <section id="about" className="relative text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[600px] w-full rounded-lg" style={{ perspective: '1000px' }}>
             <StaticImage
              src="/images/akhil.png"
              alt="Akhil"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              style={{ transform: 'rotateY(-10deg) rotateX(2deg) scale(1.05)' }}
            />
          </div>
          <div className="max-w-lg">
            <h2 className="text-5xl md:text-7xl font-bold" style={{ fontFamily: "'Anton', sans-serif" }}>
              ABOUT ME
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm a creative developer and designer with a passion for building beautiful, interactive, and modern web experiences. I thrive at the intersection of design and technology, crafting digital products that are not only visually stunning but also intuitive and performant.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's build something amazing together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
