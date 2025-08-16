'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const { siteData } = useSiteDataContext();

  if (!siteData.reviews || siteData.reviews.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.reviews.map((review) => (
            <Card key={review.id} className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg text-black/80">"{review.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
