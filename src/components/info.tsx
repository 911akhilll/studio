import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Youtube, Instagram, Info as InfoIcon } from 'lucide-react';

const Info = () => {
  return (
    <section id="info" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="text-primary" />
                <span>YouTube Channel</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow my journey and tutorials on YouTube. Content about design, development, and more.
              </p>
               <a href="#" className="text-primary hover:underline mt-4 inline-block">Visit Channel</a>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="text-primary" />
                <span>Instagram</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get a behind-the-scenes look at my projects and creative process on Instagram.
              </p>
              <a href="#" className="text-primary hover:underline mt-4 inline-block">Follow Me</a>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="text-primary" />
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
