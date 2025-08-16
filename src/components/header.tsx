import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-black tracking-tighter">HYREXVERSE</a>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-primary transition-colors">Benefits</a>
            <a href="#about" className="hover:text-primary transition-colors">Recent work</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">FAQs</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <Button variant="outline" className="rounded-md border-neutral-700 bg-black text-white hover:bg-neutral-800 hover:text-white">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
