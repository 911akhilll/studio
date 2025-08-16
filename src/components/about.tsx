import React from 'react';
import SocialButtons from './social-buttons';
import StaticImage from './static-image';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <p className="mt-4 text-lg text-black/80">
                    I'm Priyatam Behera, a passionate and versatile creative professional. With a strong foundation in both website development and graphic design, I build and beautify digital experiences. My journey has also led me to the dynamic worlds of social media influencing and YouTube content creation, where I share my knowledge and connect with a growing community. I thrive on blending technical skill with creative vision to deliver unique and impactful results.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <StaticImage 
                    src="https://placehold.co/600x400.png"
                    alt="Priyatam Behera at workstation"
                    data-ai-hint="developer designer"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
