'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Mail } from 'lucide-react';
import { useSiteDataContext } from '@/contexts/site-data-context';

const Contact = () => {
  const { siteData } = useSiteDataContext();

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
                For inquiries, collaborations, or just to say hi, feel free to reach out directly via email.
              </p>
              <a href={`mailto:${siteData.contactEmail}`} className="mt-4 inline-block text-primary font-semibold text-lg hover:underline break-all">
                {siteData.contactEmail}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
