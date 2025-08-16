import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const projects = [
  {
    title: 'EXHIBITION',
    description: 'A curated selection of our most innovative projects.',
    image: 'https://placehold.co/400x300.png',
    hint: 'art exhibition'
  },
  {
    title: 'BRANDING',
    description: 'A new identity for a groundbreaking tech startup.',
    image: 'https://placehold.co/400x300.png',
    hint: 'modern branding'
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-8xl md:text-9xl font-bold font-display leading-none tracking-tighter">Projects</h2>
            <p className="text-muted-foreground mt-2">A selection of our finest work</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {projects.map((project, index) => (
                <div id={`project-card-${index + 1}`} key={index} className='animate-on-scroll group' style={{ animationDelay: `${200 * index}ms` }}>
                    <div className="bg-card border border-border p-6 rounded-lg relative overflow-hidden">
                        <Image src={project.image} alt={project.title} width={400} height={300} className="rounded-md w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={project.hint} />
                        <div className="mt-4">
                            <h3 className="font-bold text-2xl text-primary">{project.title}</h3>
                            <p className="text-muted-foreground mt-2">{project.description}</p>
                        </div>
                        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-[1.2]">
                            <Button variant="default" size="icon" className='bg-foreground text-background hover:bg-foreground/80 rounded-full w-16 h-16 absolute top-1/2 left-1/2 -translate-x-[75%] -translate-y-[75%]'>
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div id="scroll-down-button" className="absolute right-8 bottom-8 md:right-16 md:bottom-16 flex flex-col items-center space-y-4 animate-on-scroll">
            <Button variant="outline" size="icon" className="rounded-full border-2 h-16 w-16 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors text-primary border-primary">
                <ArrowDown />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
