import React from 'react';

const Footer = () => {
  return (
    <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-foreground border-t mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-bold font-display">911akhil</h2>
        </div>
        <div>
          <h3 className="font-semibold">911akhil News</h3>
          <p className="text-sm text-muted-foreground mt-2">Latest collections</p>
        </div>
        <div>
          <h3 className="font-semibold">Social</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-8 flex justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 911akhil. All Rights Reserved.</p>
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
