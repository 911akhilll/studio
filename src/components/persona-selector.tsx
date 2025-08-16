"use client";

import type { Persona } from "@/app/page";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PersonaSelectorProps {
  selectedPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

const personas: Persona[] = ["Developer", "Designer", "Influencer", "YouTuber"];

const PersonaSelector = ({ selectedPersona, onPersonaChange }: PersonaSelectorProps) => {
  return (
    <Tabs
      defaultValue={selectedPersona}
      onValueChange={(value) => onPersonaChange(value as Persona)}
      className="w-full max-w-md"
    >
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-background/50 backdrop-blur-md border border-primary/20 h-auto">
        {personas.map((persona) => (
          <TabsTrigger key={persona} value={persona} className="text-xs sm:text-sm">
            {persona}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default PersonaSelector;
