'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { sendEmail } from '@/ai/flows/send-email-flow';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const Contact = () => {
  const { siteData } = useSiteDataContext();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    try {
      await sendEmail({
        to: siteData.contactEmail,
        fromName: values.name,
        fromEmail: values.email,
        message: values.message,
      });
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I will get back to you soon.',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">Contact Me</h2>
        <div className="max-w-xl mx-auto">
          <Card className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Mail className="w-8 h-8 text-black" />
                Email Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-black/80">
                For inquiries, collaborations, or just to say hi, feel free to reach out.
              </p>
              <a href={`mailto:${siteData.contactEmail}`} className="mt-4 inline-block text-primary font-semibold text-lg hover:underline">
                {siteData.contactEmail}
              </a>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-white border-black focus:ring-primary text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your Email" {...field} className="bg-white border-black focus:ring-primary text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your Message" {...field} className="bg-white border-black focus:ring-primary text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-black/80" disabled={isSending}>
                    {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
