'use server';
/**
 * @fileOverview A flow for sending an email from the contact form.
 *
 * - sendEmail - A function that handles sending the email.
 * - SendEmailSchema - The input type for the sendEmail function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

// IMPORTANT: This key should be stored in a secure way, like environment variables.
// For this example, it's hardcoded, but in a real application,
// use process.env.RESEND_API_KEY
const resend = new Resend('re_123456789');

export const SendEmailSchema = z.object({
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
    // In a real application, you would integrate with an email service like Resend, SendGrid, etc.
    // The following code is a placeholder to demonstrate the flow.
    // You will need to install the 'resend' package and configure it with your API key.
    console.log(`Sending email to ${input.to}`);
    console.log(`From: ${input.fromName} <${input.fromEmail}>`);
    console.log(`Message: ${input.message}`);

    // Example using Resend (uncomment and configure to use)
    /*
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // This should be a domain you've verified with Resend
        to: input.to,
        subject: `New message from ${input.fromName} via your portfolio`,
        html: `<p>You have a new message from <strong>${input.fromName}</strong> (${input.fromEmail}):</p><p>${input.message}</p>`,
      });
    } catch (error) {
        console.error("Failed to send email", error);
        throw new Error("Email sending failed.");
    }
    */
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
);
