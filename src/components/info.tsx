"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Youtube, Instagram, Info as InfoIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const InfoCard = ({ icon, title, text, linkText, href, delay = 0 }: { icon: React.ReactNode, title: string, text: string, linkText?: string, href?: string, delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={cardRef}>
      <Card className={cn(
        "bg-white/5 backdrop-blur-lg border-primary/20 rounded-2xl transition-all duration-700 opacity-0",
        isVisible && "fade-in-up"
        )}
        style={{ animationDelay: `${delay}s` }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            {icon}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{text}</p>
          {linkText && href && (
            <a href={href} className="text-accent hover:underline mt-4 inline-block font-semibold">
              {linkText}
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


const Info = () => {
  const cardData = [
    {
      icon: <Youtube className="text-primary w-8 h-8" />,
      title: "YouTube",
      text: "Follow my journey and tutorials on YouTube.",
      linkText: "Visit Channel",
      href: "#",
      delay: 0
    },
    {
      icon: <Instagram className="text-primary w-8 h-8" />,
      title: "Instagram",
      text: "A look at my projects and creative process.",
      linkText: "Follow Me",
      href: "#",
      delay: 0.1
    },
    {
      icon: <Send className="text-primary w-8 h-8" />,
      title: "Telegram",
      text: "Join the community for updates and discussions.",
      linkText: "Join Channel",
      href: "#",
      delay: 0.2
    },
    {
      icon: <InfoIcon className="text-primary w-8 h-8" />,
      title: "About",
      text: "Passionate designer and developer creating modern digital experiences.",
      delay: 0.3
    }
  ];

  return (
    <section id="info" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
