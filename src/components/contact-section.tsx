"use client";

import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const ContactSection = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        });
        alert("Message sent! (Check the console)");
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

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-8">
            <Card className="bg-card/50 p-6 text-left backdrop-blur-sm">
                <CardContent className="p-0">
                    <div className="flex items-center gap-4">
                        <Mail className="h-8 w-8 text-accent" />
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <a href="mailto:911priyatambehera@gmail.com" className="text-muted-foreground hover:text-accent">
                                911priyatambehera@gmail.com
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" type="text" placeholder="Your Name" required className="bg-input/50"/>
          <Input name="email" type="email" placeholder="Your Email" required className="bg-input/50"/>
          <Textarea name="message" placeholder="Your Message" required className="min-h-[150px] bg-input/50"/>
          <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default ContactSection;
