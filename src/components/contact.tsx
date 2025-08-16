import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12 font-display">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Card className="bg-card border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                  <Mail className="w-8 h-8 text-accent" />
                  Email Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  For inquiries, collaborations, or just to say hi, feel free to reach out.
                </p>
                <a href="mailto:911priyatambehera@gmail.com" className="mt-4 inline-block text-accent font-semibold text-lg hover:underline">
                  911priyatambehera@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>
          <div>
            <form className="space-y-4">
              <Input type="text" placeholder="Your Name" className="bg-input border-border focus:ring-accent" />
              <Input type="email" placeholder="Your Email" className="bg-input border-border focus:ring-accent" />
              <Textarea placeholder="Your Message" className="bg-input border-border focus:ring-accent" />
              <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
