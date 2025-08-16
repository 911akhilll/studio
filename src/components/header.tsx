import React, { useState } from 'react';
import { useAdmin } from '@/context/admin-context';

const Header = () => {
  const { setOpen } = useAdmin();
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount >= 4) {
      setOpen(true);
      setClickCount(0); // Reset after opening
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={handleClick} className="text-2xl font-black tracking-tighter focus:outline-none">
            HYREXVERSE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
