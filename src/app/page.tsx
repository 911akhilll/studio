"use client";

import type { ProfileContentInput, ProfileContentOutput } from "@/ai/flows/profile-content-generator";
import { generateProfileContent } from "@/ai/flows/profile-content-generator";
import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/hero-section";
import PersonaSelector from "@/components/persona-selector";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import ContactSection from "@/components/contact-section";

export type Persona = "Developer" | "Designer" | "Influencer" | "YouTuber";

export default function Home() {
  const [persona, setPersona] = useState<Persona>("Developer");
  const [content, setContent] = useState<ProfileContentOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const result = await generateProfileContent({ persona });
        setContent(result);
      } catch (error) {
        console.error("Error generating profile content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [persona]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AnimatedBackground />
      <div className="fixed top-6 right-6 z-50">
        <PersonaSelector selectedPersona={persona} onPersonaChange={setPersona} />
      </div>

      <main className="relative z-10">
        <HeroSection loading={loading} tagline={content?.tagline} />
        <AboutSection loading={loading} aboutMe={content?.aboutMe} />
        <ServicesSection loading={loading} persona={persona} services={content?.services} />
        <PortfolioSection />
        <ContactSection />
      </main>
    </div>
  );
}
