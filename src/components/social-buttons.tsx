import React from 'react';
import { Button } from './ui/button';
import { Youtube, Instagram, Send } from 'lucide-react';

const SocialButtons = () => {
    const socialLinks = [
        {
            href: "https://youtube.com/@hyrexverse1?si=c4NbNmZTlqsZtKf5",
            icon: <Youtube />,
            label: "YouTube",
            className: "bg-red-600 hover:bg-red-700"
        },
        {
            href: "https://www.instagram.com",
            icon: <Instagram />,
            label: "Instagram",
            className: "bg-pink-600 hover:bg-pink-700"
        },
        {
            href: "https://t.me/Hyrexverse",
            icon: <Send />,
            label: "Telegram",
            className: "bg-blue-500 hover:bg-blue-600"
        },
    ]
  return (
    <div className="flex flex-wrap gap-4 justify-center">
        {socialLinks.map(link => (
            <Button key={link.label} asChild size="lg" className={`${link.className} text-white rounded-lg shadow-lg transition-all transform hover:scale-105`}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    {link.label}
                </a>
            </Button>
        ))}
    </div>
  );
};

export default SocialButtons;
