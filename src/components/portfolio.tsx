import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-secondary text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">My Work</h2>
        <div className="max-w-3xl mx-auto">
            <Card className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center">
              <CardContent className="p-8 md:p-12">
                <p className="text-2xl md:text-3xl font-bold text-black/90">
                    I'm providing valuable information about how to grow your youtube channel and Become a successful youtuber.
                </p>
                <Button asChild size="lg" className="mt-8 bg-black text-white rounded-lg shadow-lg hover:bg-black/80 transition-all transform hover:scale-105">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">Let's Do It</a>
                </Button>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
