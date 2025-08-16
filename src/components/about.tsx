import React from 'react';
import StaticImage from './static-image';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <p className="mt-4 text-lg text-black/80">
                    I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!
                </p>
            </div>
            <div className="order-1 md:order-2">
                <StaticImage 
                    src="/images/_8ef3a7b5-22a4-4a41-860e-b7d1eb290566.png"
                    alt="Hyrexverse avatar"
                    data-ai-hint="gaming avatar"
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
