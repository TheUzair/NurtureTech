import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'hi', label: 'Hindi' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="relative inline-block p-1">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="block appearance-none w-full 
                 bg-white/10 hover:bg-white/20 
                 dark:bg-gray-700 dark:hover:bg-gray-600
                 border border-transparent
                 text-white font-medium
                 dark:text-gray-200
                 py-[6px] px-4 pr-8 rounded-lg 
                 leading-tight focus:outline-none 
                 focus:ring-2 focus:ring-white/20
                 transition-colors"
      >
        {languages.map((lng) => (
          <option 
            key={lng.value} 
            value={lng.value}
            className="bg-indigo-500 text-white 
                     dark:bg-gray-800 dark:text-white"
          >
            {lng.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 
                    flex items-center pr-4 text-white/70 dark:text-gray-300">
        <svg 
          className="fill-current h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;