"use client";

import type { Persona } from "@/app/page";
import { Section } from "./section";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeXml, Paintbrush, Megaphone, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

interface ServicesSectionProps {
  loading: boolean;
  services: string[] | undefined;
  persona: Persona;
}

const icons: Record<Persona, ReactNode> = {
  Developer: <CodeXml className="h-8 w-8 text-accent" />,
  Designer: <Paintbrush className="h-8 w-8 text-accent" />,
  Influencer: <Megaphone className="h-8 w-8 text-accent" />,
  YouTuber: <Youtube className="h-8 w-8 text-accent" />,
};

const ServicesSection = ({ loading, services, persona }: ServicesSectionProps) => {
  return (
    <Section id="services">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight">Services & Skills</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Here's what I can do for you, tailored to my {persona.toLowerCase()} persona.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="flex h-48 flex-col items-center justify-center p-6 text-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="mt-4 h-6 w-3/4" />
              </Card>
            ))
          : services?.map((service, i) => (
              <Card
                key={i}
                className="group flex h-48 flex-col items-center justify-center bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-primary/20"
              >
                <CardHeader className="items-center">
                  {icons[persona]}
                  <CardTitle className="mt-4">{service}</CardTitle>
                </CardHeader>
              </Card>
            ))}
      </div>
    </Section>
  );
};

export default ServicesSection;
