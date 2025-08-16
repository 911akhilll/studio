import React from 'react';
import { Button } from './ui/button';
import { Menu, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-3xl font-bold font-display">Lab.</a>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#projects" className="hover:text-accent transition-colors">PROJECTS</a>
              <a href="#" className="hover:text-accent transition-colors">SHOP</a>
              <a href="#" className="flex items-center hover:text-accent transition-colors">
                NEW ARRIVALS <ChevronDown className="w-4 h-4 ml-1" />
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
