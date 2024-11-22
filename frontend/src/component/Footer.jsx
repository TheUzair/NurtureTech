import React from 'react';

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <footer className="bg-cyan-900 dark:bg-black text-white flex items-center justify-center px-4 h-16">
      <p className="text-center">Copyright &copy; {currYear} All rights reserved</p>
    </footer>
  );
};

export default Footer;
