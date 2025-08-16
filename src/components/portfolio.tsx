import React from 'react';
import { Card, CardContent } from './ui/card';
import StaticImage from './static-image';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the first project.',
    image: 'https://placehold.co/600x400.png',
    hint: 'web design',
  },
  {
    title: 'Project Two',
    description: 'A brief description of the second project.',
    image: 'https://placehold.co/600x400.png',
    hint: 'graphic design',
  },
  {
    title: 'Project Three',
    description: 'A brief description of the third project.',
    image: 'https://placehold.co/600x400.png',
    hint: 'youtube thumbnail',
  },
  {
    title: 'Project Four',
    description: 'A brief description of the fourth project.',
    image: 'https://placehold.co/600x400.png',
    hint: 'social media',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12 font-display">My Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-card border-primary/20 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-primary/30">
              <div className="relative h-60">
                <StaticImage src={project.image} alt={project.title} data-ai-hint={project.hint} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold font-display">{project.title}</h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
