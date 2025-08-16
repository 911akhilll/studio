import React from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-lg shadow-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 border-b border-border/50">
          <a href="#" className="text-2xl font-bold font-display tracking-wider">HYREXVERSE</a>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#info" className="hover:text-primary transition-colors">ABOUT</a>
            <a href="#info" className="hover:text-primary transition-colors">CONTACT</a>
          </nav>
          <Button variant="secondary" className="rounded-full shadow-md hover:shadow-green-500/50 animate-pulse-text">
            GET IN TOUCH
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
