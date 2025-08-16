'use client';
import React from 'react';

const About = () => {
  const aboutText = "I'm Hyrexverse and I'm a Youtuber and influencer who teaches you how to grow your social media accounts. If you want to learn about my strategy, then join us via Telegram, Instagram, or by subscribing to my YouTube channel. Thank you!";
  const profileImage = 'https://placehold.co/450x300.png';

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <p className="mt-4 text-lg text-black/80">
                    {aboutText}
                </p>
            </div>
            <div className="order-1 md:order-2">
                {profileImage && (
                    <img 
                        src={profileImage}
                        alt="Domi boy anime"
                        data-ai-hint="anime boy"
                        width={450}
                        height={300}
                        className="rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                    />
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
