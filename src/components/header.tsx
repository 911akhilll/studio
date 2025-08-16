import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-black tracking-tighter">PRIYATAM</a>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black">
          <nav className="flex flex-col items-center space-y-4 py-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
