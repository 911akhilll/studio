'use server';

/**
 * @fileOverview Dynamically generates profile content based on the selected persona.
 *
 * - generateProfileContent - A function that generates profile content.
 * - ProfileContentInput - The input type for the generateProfileContent function.
 * - ProfileContentOutput - The return type for the generateProfileContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileContentInputSchema = z.object({
  persona: z
    .enum(['Developer', 'Designer', 'Influencer', 'YouTuber'])
    .describe('The selected persona for the profile.'),
});
export type ProfileContentInput = z.infer<typeof ProfileContentInputSchema>;

const ProfileContentOutputSchema = z.object({
  tagline: z.string().describe('A short tagline reflecting the selected persona.'),
  aboutMe: z.string().describe('A paragraph describing the profile owner from the perspective of the selected persona.'),
  services: z.array(
    z.string().describe('A list of services or skills relevant to the selected persona.')
  ).describe('List of services/skills to display'),
});
export type ProfileContentOutput = z.infer<typeof ProfileContentOutputSchema>;

export async function generateProfileContent(input: ProfileContentInput): Promise<ProfileContentOutput> {
  return generateProfileContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileContentPrompt',
  input: {schema: ProfileContentInputSchema},
  output: {schema: ProfileContentOutputSchema},
  prompt: `You are a creative content generator for a portfolio website.  You will create content dynamically based on the user's selected profile persona.

  The personas are:
  - Developer
  - Designer
  - Influencer
  - YouTuber

  Persona: {{{persona}}}

  Tagline: Create a short, catchy tagline that reflects the persona.
  About Me: Write a brief paragraph describing Priyatam Behera from the perspective of the selected persona. Use smooth and lively text.
  Services: List 3-4 services or skills that are most relevant to the persona.

  Output the tagline, aboutMe, and services in the specified JSON format.
  Remember to tailor content to the specific persona, use a tone and style suited to it.
  Avoid generic descriptions, be creative.
  Do not start the about me section with "As a ..."
  Make the list of services as specific keywords, without full sentences.
  `,
});

const generateProfileContentFlow = ai.defineFlow(
  {
    name: 'generateProfileContentFlow',
    inputSchema: ProfileContentInputSchema,
    outputSchema: ProfileContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
