import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code, PenTool, Users, Youtube } from 'lucide-react';

const services = [
    {
        icon: <Code className="w-10 h-10 text-accent" />,
        title: "Website Development",
        description: "Building fast, responsive, and beautiful websites from scratch to establish your online presence."
    },
    {
        icon: <PenTool className="w-10 h-10 text-accent" />,
        title: "Graphic Design",
        description: "Creating stunning visuals, logos, and branding materials that communicate your message effectively."
    },
    {
        icon: <Users className="w-10 h-10 text-accent" />,
        title: "Influencing",
        description: "Leveraging social media platforms to build brand awareness and connect with your target audience."
    },
    {
        icon: <Youtube className="w-10 h-10 text-accent" />,
        title: "YouTube Content",
        description: "Producing engaging video content, from tutorials to vlogs, to grow your channel and community."
    }
];

const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12 font-display">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <Card key={index} className="bg-card border-primary/20 rounded-lg shadow-lg hover:shadow-primary/30 transform hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                        <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center border-2 border-primary/30 mb-4">
                           {service.icon}
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight font-display">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
