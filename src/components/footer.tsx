import React from 'react';

const Footer = () => {

  return (
    <footer className="bg-secondary text-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-bold text-lg">Hyrexverse</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
