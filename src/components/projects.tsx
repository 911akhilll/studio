import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

const projects = [
  {
    title: 'EXHIBITION',
    description: 'A curated selection of our most innovative projects.',
    image: 'https://placehold.co/200x150.png',
    hint: 'art exhibition'
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative min-h-screen flex items-center bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-5 lg:col-span-4 self-end animate-on-scroll">
            <h2 className="text-8xl md:text-9xl font-bold font-display leading-none">Lab.</h2>
        </div>
        
        <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className='animate-on-scroll'>
                {projects.map((project, index) => (
                    <div key={index} className="bg-secondary p-6 rounded-lg relative">
                        <div className="flex items-center space-x-4">
                            <Image src={project.image} alt={project.title} width={150} height={100} className="rounded-md" data-ai-hint={project.hint} />
                            <div>
                                <h3 className="font-bold text-lg">{project.title}</h3>
                                <div className="flex space-x-1 mt-2">
                                    <span className="w-4 h-1 bg-accent rounded-full"></span>
                                    <span className="w-1 h-1 bg-border rounded-full"></span>
                                    <span className="w-1 h-1 bg-border rounded-full"></span>
                                    <span className="w-1 h-1 bg-border rounded-full"></span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-md flex items-center justify-center">
                            <Button variant="default" size="icon" className='bg-foreground text-background hover:bg-foreground/80'>
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative h-96 w-full md:h-[60vh] animate-on-scroll'>
                <Image
                    src="https://placehold.co/400x600.png"
                    alt="Black gloved hand"
                    fill
                    className="object-contain"
                    data-ai-hint="gloved hand"
                />
            </div>
        </div>

        <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 flex flex-col items-center space-y-4 animate-on-scroll">
            <Button variant="outline" size="icon" className="rounded-full border-2 h-14 w-14">
                <ArrowDown />
            </Button>
        </div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block animate-on-scroll">
            <div className='flex items-center space-x-4 transform -rotate-90'>
                <span className='text-xs font-bold whitespace-nowrap'>- 01</span>
            </div>
        </div>

         <div className="absolute left-8 bottom-8 md:left-16 md:bottom-16 text-xs text-muted-foreground hidden md:block animate-on-scroll">
             <p>LAB NEWS</p>
             <p>LATEST COLLECTIONS</p>
         </div>
      </div>
    </section>
  );
};

export default Projects;
