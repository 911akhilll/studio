import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Youtube, Instagram, Info as InfoIcon } from 'lucide-react';

const Info = () => {
  return (
    <section id="info" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          
          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl transition-all duration-300 hover:scale-105 hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Youtube className="text-primary w-8 h-8" />
                <span>YouTube Channel</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow my journey and tutorials on YouTube. Content about design, development, and more.
              </p>
               <a href="#" className="text-accent hover:underline mt-4 inline-block font-semibold">Visit Channel</a>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl transition-all duration-300 hover:scale-105 hover:[transform:rotateX(10deg)_rotateY(0deg)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Instagram className="text-primary w-8 h-8" />
                <span>Instagram</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get a behind-the-scenes look at my projects and creative process on Instagram.
              </p>
              <a href="#" className="text-accent hover:underline mt-4 inline-block font-semibold">Follow Me</a>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 md:col-span-2 lg:col-span-1 rounded-2xl transition-all duration-300 hover:scale-105 hover:[transform:rotateX(10deg)_rotateY(10deg)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <InfoIcon className="text-primary w-8 h-8" />
                <span>About</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I am a passionate designer and developer creating modern and useful digital experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Info;
