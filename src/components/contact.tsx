import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
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
                    <a href="mailto:911priyatambehera@gmail.com" className="mt-4 inline-block text-primary font-semibold text-lg hover:underline">
                    911priyatambehera@gmail.com
                    </a>
                    <form className="space-y-4 mt-6">
                        <Input type="text" placeholder="Your Name" className="bg-white border-black focus:ring-primary" />
                        <Input type="email" placeholder="Your Email" className="bg-white border-black focus:ring-primary" />
                        <Textarea placeholder="Your Message" className="bg-white border-black focus:ring-primary" />
                        <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-black/80">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
