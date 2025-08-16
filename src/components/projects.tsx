import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Digital Canvas',
    description: 'An interactive art platform combining generative algorithms with user input to create unique visual masterpieces.',
    image: 'https://placehold.co/1200x800.png',
    hint: 'abstract digital art',
    link: '#',
    year: '2024',
    role: 'Lead Developer'
  },
  {
    title: 'Brand Morph',
    description: 'A complete rebranding and website overhaul for a global tech firm, focusing on a minimalist and futuristic identity.',
    image: 'https://placehold.co/1200x800.png',
    hint: 'minimalist branding website',
    link: '#',
    year: '2023',
    role: 'UI/UX Designer'
  },
];

const Projects = () => {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, {
      threshold: 0.2,
    });

    const elements = document.querySelectorAll('.project-card');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);


  return (
    <section id="projects" className="relative bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
            <h2 className="text-5xl md:text-7xl font-bold" style={{ fontFamily: "'Anton', sans-serif" }}>FEATURED WORK</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">A selection of projects that showcase my passion for design and development.</p>
        </div>
        
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div 
              id={`project-card-${index + 1}`} 
              key={index} 
              className="project-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center opacity-0"
            >
              <div className={`relative ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="project-card-image">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={1200} 
                    height={800} 
                    className="w-full h-full object-cover rounded-lg" 
                    data-ai-hint={project.hint} 
                  />
                </div>
              </div>
              <div className={`md:px-8 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-2">
                    <span>{project.year}</span>
                    <span>/</span>
                    <span>{project.role}</span>
                </div>
                <h3 className="font-bold text-4xl md:text-5xl text-primary tracking-tighter" style={{ fontFamily: "'Anton', sans-serif" }}>{project.title}</h3>
                <p className="text-muted-foreground mt-4 text-lg">{project.description}</p>
                <Button variant="link" className="mt-6 text-lg text-primary p-0 hover:text-red-400">
                  View Case Study <ArrowRight className="ml-2" />
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
