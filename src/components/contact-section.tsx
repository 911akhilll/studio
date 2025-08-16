"use client";

import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
    const { toast } = useToast();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        });
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });
        e.currentTarget.reset();
    };

  return (
    <Section id="contact">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight">Get In Touch</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Have a project in mind or just want to say hi? Feel free to reach out.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-8">
            <Card className="p-6 text-left">
                <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                            <Mail className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <a href="mailto:911priyatambehera@gmail.com" className="text-muted-foreground hover:text-primary">
                                911priyatambehera@gmail.com
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" type="text" placeholder="Your Name" required />
                    <Input name="email" type="email" placeholder="Your Email" required />
                    <Textarea name="message" placeholder="Your Message" required className="min-h-[150px]"/>
                    <Button type="submit" size="lg" className="w-full">
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default ContactSection;
