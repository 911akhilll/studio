import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-black tracking-tighter">HYREXVERSE</a>
          <div className="text-sm font-medium space-x-4">
            <span>YouTuber</span>
            <span>Influencer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
