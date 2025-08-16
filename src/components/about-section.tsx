"use client";
import Image from "next/image";
import { Section } from "./section";
import { Skeleton } from "./ui/skeleton";

interface AboutSectionProps {
  loading: boolean;
  aboutMe: string | undefined;
}

const AboutSection = ({ loading, aboutMe }: AboutSectionProps) => {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="font-headline text-4xl font-bold tracking-tight">About Me</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            {loading ? (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </>
            ) : (
              <p>{aboutMe}</p>
            )}
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2">
           <div className="relative h-80 w-80">
                <Image
                    src="https://placehold.co/600x600.png"
                    alt="About me image"
                    fill
                    className="rounded-2xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    data-ai-hint="person coding"
                />
            </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
