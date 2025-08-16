import React from 'react';
import { Button } from './ui/button';
import { Menu, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-2xl font-bold">+1</a>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#projects" className="hover:text-accent">PROJECTS</a>
              <a href="#" className="hover:text-accent">SHOP</a>
              <a href="#" className="flex items-center hover:text-accent">
                NEW ARRIVALS <ChevronDown className="w-4 h-4 ml-1" />
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
