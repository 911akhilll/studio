"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroSectionProps {
  loading: boolean;
  tagline: string | undefined;
}

const HeroSection = ({ loading, tagline }: HeroSectionProps) => {
  return (
    <section className="flex min-h-screen items-center justify-center text-center">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        <div className="relative h-40 w-40 md:h-48 md:w-48">
          <Image
            src="https://placehold.co/200x200.png"
            alt="Priyatam Behera"
            width={200}
            height={200}
            priority
            className="rounded-full border-4 border-primary/50 object-cover shadow-glow"
            data-ai-hint="profile picture"
          />
        </div>
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Priyatam Behera
          </h1>
          <div className="mx-auto h-8 max-w-md">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <p className="font-headline text-xl text-accent md:text-2xl">
                {tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
