'use server';
/**
 * @fileOverview A flow for sending an email from the contact form.
 *
 * - sendEmail - A function that handles sending the email.
 * - SendEmailSchema - The input type for the sendEmail function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// This flow is no longer in use and can be safely removed or ignored.
// The contact form was simplified to use a mailto: link to avoid paid services.

const SendEmailSchema = z.object({
  to: z.string().email().describe('The email address to send the message to.'),
  fromName: z.string().describe("The sender's name."),
  fromEmail: z.string().email().describe("The sender's email address."),
  message: z.string().describe('The message content.'),
});

export type SendEmailInput = z.infer<typeof SendEmailSchema>;

export async function sendEmail(input: SendEmailInput): Promise<void> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    console.log('Email functionality has been disabled to ensure all features are free.');
    console.log(`Email would have been sent to ${input.to}`);
    // The original Resend logic has been removed.
    
    // Simulate a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
);
