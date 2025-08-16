"use client";

import Image from "next/image";
import { Section } from "./section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with Next.js, Stripe, and Tailwind CSS.",
    image: "https://placehold.co/600x400.png",
    hint: "ecommerce website"
  },
  {
    title: "Social Media App",
    description: "A mobile-first social media application built with React Native and Firebase.",
    image: "https://placehold.co/600x400.png",
    hint: "social media"
  },
  {
    title: "Persona Portfolio",
    description: "This very portfolio, built with Next.js, GenAI, and Shadcn UI.",
    image: "https://placehold.co/600x400.png",
    hint: "portfolio website"
  },
  {
    title: "Corporate Branding",
    description: "Complete brand identity design for a leading tech startup.",
    image: "https://placehold.co/600x400.png",
    hint: "brand design"
  },
];

const PortfolioSection = () => {
  return (
    <Section id="portfolio" className="bg-secondary/50">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight">My Work</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A selection of projects that I'm proud of.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <Card key={i} className="group overflow-hidden">
             <CardHeader className="p-0">
                <div className="relative h-60 w-full overflow-hidden">
                    <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    data-ai-hint={project.hint}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default PortfolioSection;
