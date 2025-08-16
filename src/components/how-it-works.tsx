import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Zap, Send, Eye } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Zap className="w-10 h-10 text-black" />,
            title: "Subscribe",
            description: "Kickstart your design adventure by hopping on our monthly subscription. For just $2k, you get unlimited dibs on top-notch design work."
        },
        {
            icon: <Send className="w-10 h-10 text-black" />,
            title: "Request",
            description: "Alright, you're in! Now, it's time to toss your design tasks our way. Need a branding concept? A sleek landing page design? Or maybe a standout trifold brochure? No sweat. Just keep those requests coming!"
        },
        {
            icon: <Eye className="w-10 h-10 text-black" />,
            title: "Review",
            description: "Hold tight! In just 48 hours, you'll get your first peek at your completed design. And if it's not love at first sight, no worries! We can tweak and tune it until it's just right - that's the beauty of unlimited revisions."
        }
    ];

  return (
    <section id="how-it-works" className="pb-24 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <Card key={index} className="bg-background border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <CardHeader className="bg-primary rounded-t-md p-6">
                        <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center border-2 border-black">
                           {step.icon}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <CardTitle className="text-2xl font-black tracking-tight">{step.title}</CardTitle>
                        <p className="mt-2 text-foreground/80">{step.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
