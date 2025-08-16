import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-bold text-lg font-display">Priyatam Behera</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
