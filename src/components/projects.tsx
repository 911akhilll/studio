import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'EXHIBITION',
    description: 'A curated selection of our most innovative projects, showcasing the intersection of art, technology, and design. Each piece tells a unique story.',
    image: 'https://placehold.co/800x600.png',
    hint: 'art exhibition dark',
    link: '#',
  },
  {
    title: 'BRANDING',
    description: 'We developed a new identity for a groundbreaking tech startup, focusing on a minimalist aesthetic that reflects their forward-thinking approach.',
    image: 'https://placehold.co/800x600.png',
    hint: 'modern branding monochrome',
    link: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative bg-background text-foreground py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24 animate-on-scroll">
            <h2 className="text-8xl md:text-9xl font-bold font-display leading-none tracking-tighter">Projects</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A selection of our finest work, demonstrating our commitment to quality, innovation, and aesthetic excellence.</p>
        </div>
        
        <div className="space-y-28">
          {projects.map((project, index) => (
            <div 
              id={`project-card-${index + 1}`} 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-12 animate-on-scroll group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              style={{ animationDelay: `${200 * index}ms` }}
            >
              <div className="md:w-1/2 relative">
                <div className="aspect-w-4 aspect-h-3">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={800} 
                    height={600} 
                    className="rounded-lg w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                    data-ai-hint={project.hint} 
                  />
                </div>
              </div>
              <div className="md:w-1/2 md:px-8">
                <h3 className="font-bold text-4xl text-primary tracking-tighter">{project.title}</h3>
                <p className="text-muted-foreground mt-4 text-lg">{project.description}</p>
                <Button variant="link" className="mt-6 text-lg text-primary p-0 hover:text-red-400 transition-colors">
                  View Project <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
