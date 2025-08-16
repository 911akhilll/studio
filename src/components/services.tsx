import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Youtube, Instagram, Send } from 'lucide-react';
import SocialButtons from './social-buttons';

const services = [
    {
        icon: <Youtube className="w-10 h-10 text-black" />,
        title: "YouTube",
        description: "Content and strategies to grow your YouTube channel and become a successful creator."
    },
    {
        icon: <Instagram className="w-10 h-10 text-black" />,
        title: "Instagram",
        description: "Leveraging Instagram to build your brand, engage your audience, and drive growth."
    },
    {
        icon: <Send className="w-10 h-10 text-black" />,
        title: "Telegram",
        description: "Building and engaging with your community on Telegram for direct communication."
    }
];

const Services = () => {
  return (
    <section id="services" className="pb-24 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <Card key={index} className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <CardHeader className="bg-primary rounded-t-md p-6">
                        <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center border-2 border-black">
                           {service.icon}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <CardTitle className="text-2xl font-black tracking-tight">{service.title}</CardTitle>
                        <p className="mt-2 text-black/80">{service.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="text-center mt-12">
            <SocialButtons />
        </div>
      </div>
    </section>
  );
};

export default Services;
