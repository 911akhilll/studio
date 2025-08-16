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
      <TabsList className="grid w-full grid-cols-2 bg-background/80 backdrop-blur-md md:grid-cols-4 h-auto shadow-md">
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
