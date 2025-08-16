import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Youtube, Instagram, Info as InfoIcon, Send } from 'lucide-react';

const Info = () => {
  return (
    <section id="info" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]">
          
          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl animate-float-3d" style={{ animationDelay: '0s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Youtube className="text-primary w-8 h-8" />
                <span>YouTube</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow my journey and tutorials on YouTube.
              </p>
               <a href="#" className="text-accent hover:underline mt-4 inline-block font-semibold">Visit Channel</a>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl animate-float-3d" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Instagram className="text-primary w-8 h-8" />
                <span>Instagram</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A look at my projects and creative process.
              </p>
              <a href="#" className="text-accent hover:underline mt-4 inline-block font-semibold">Follow Me</a>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl animate-float-3d" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Send className="text-primary w-8 h-8" />
                <span>Telegram</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join the community for updates and discussions.
              </p>
              <a href="#" className="text-accent hover:underline mt-4 inline-block font-semibold">Join Channel</a>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl animate-float-3d" style={{ animationDelay: '1.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <InfoIcon className="text-primary w-8 h-8" />
                <span>About</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Passionate designer and developer creating modern digital experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Info;
