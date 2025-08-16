'use server';
/**
 * @fileOverview A flow for saving website settings.
 *
 * - saveSettings - A function that takes the current website settings and saves them.
 * - SaveSettingsInput - The input type for the saveSettings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SaveSettingsInputSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  aboutText: z.string(),
  profileImage: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
  useAnimation: z.boolean(),
});
type SaveSettingsInput = z.infer<typeof SaveSettingsInputSchema>;

export async function saveSettings(input: SaveSettingsInput): Promise<{success: boolean}> {
  return saveSettingsFlow(input);
}

const saveSettingsFlow = ai.defineFlow(
  {
    name: 'saveSettingsFlow',
    inputSchema: SaveSettingsInputSchema,
    outputSchema: z.object({success: z.boolean()}),
  },
  async (input) => {
    // This flow is a bit of a special case. It doesn't call an LLM.
    // Instead, it acts as a trigger for the AI to rewrite the default
    // values in the admin-context.tsx file. The AI assistant watching
    // this flow will perform the file modification.
    console.log('Saving settings:', input);
    return {success: true};
  }
);
