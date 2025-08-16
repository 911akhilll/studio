import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code, PenTool, Users, Youtube } from 'lucide-react';

const services = [
    {
        icon: <Code className="w-10 h-10 text-black" />,
        title: "Website Development",
        description: "Building fast, responsive, and beautiful websites from scratch to establish your online presence."
    },
    {
        icon: <PenTool className="w-10 h-10 text-black" />,
        title: "Graphic Design",
        description: "Creating stunning visuals, logos, and branding materials that communicate your message effectively."
    },
    {
        icon: <Users className="w-10 h-10 text-black" />,
        title: "Influencing",
        description: "Leveraging social media platforms to build brand awareness and connect with your target audience."
    },
    {
        icon: <Youtube className="w-10 h-10 text-black" />,
        title: "YouTube Content",
        description: "Producing engaging video content, from tutorials to vlogs, to grow your channel and community."
    }
];

const Services = () => {
  return (
    <section id="services" className="pb-24 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default Services;
