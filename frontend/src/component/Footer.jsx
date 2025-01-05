import React from 'react';

const Footer = () => {
  const currYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       dark:from-slate-800 dark:via-slate-900 dark:to-black
                       text-white flex items-center justify-center px-4 h-16 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative">
        <p className="text-center text-white/90 dark:text-white/80 font-medium">
          Copyright &copy; {currYear} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;