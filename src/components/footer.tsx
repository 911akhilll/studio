import React from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-foreground relative">
      <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold text-lg">Hyrexverse</p>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
        <div className="hidden md:block">
            <Button variant="ghost" size="icon" onClick={scrollToTop} aria-label="Scroll to top">
                <ArrowUp />
            </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
