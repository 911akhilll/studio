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
];

const Projects = () => {
  return (
    <section id="projects" className="relative min-h-screen flex items-center bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-5 lg:col-span-4 self-end animate-on-scroll">
            <h2 className="text-8xl md:text-9xl font-bold font-display leading-none tracking-tighter">Projects</h2>
        </div>
        
        <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className='animate-on-scroll' style={{ animationDelay: '200ms' }}>
                {projects.map((project, index) => (
                    <div key={index} className="bg-card border border-border p-6 rounded-lg relative group overflow-hidden">
                        <Image src={project.image} alt={project.title} width={400} height={300} className="rounded-md w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 grayscale" data-ai-hint={project.hint} />
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{project.title}</h3>
                            <div className="flex space-x-1 mt-2">
                                <span className="w-6 h-1 bg-primary rounded-full"></span>
                                <span className="w-2 h-1 bg-border rounded-full"></span>
                                <span className="w-2 h-1 bg-border rounded-full"></span>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Button variant="default" size="icon" className='bg-foreground text-background hover:bg-foreground/80 rounded-full w-12 h-12'>
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative h-96 w-full md:h-[60vh] animate-on-scroll group' style={{ animationDelay: '400ms' }}>
                <Image
                    src="https://placehold.co/400x600.png"
                    alt="Black gloved hand"
                    fill
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 grayscale"
                    data-ai-hint="gloved hand"
                />
            </div>
        </div>

        <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 flex flex-col items-center space-y-4 animate-on-scroll">
            <Button variant="outline" size="icon" className="rounded-full border-2 h-14 w-14 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <ArrowDown />
            </Button>
        </div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block animate-on-scroll">
            <div className='flex items-center space-x-4 transform -rotate-90'>
                <span className='text-xs font-bold whitespace-nowrap'>- 01</span>
            </div>
        </div>

         <div className="absolute left-8 bottom-8 md:left-16 md:bottom-16 text-xs text-muted-foreground hidden md:block animate-on-scroll">
             <p>911AKHIL NEWS</p>
             <p>LATEST COLLECTIONS</p>
         </div>
      </div>
    </section>
  );
};

export default Projects;
