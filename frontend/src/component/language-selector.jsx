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
      {/* Dropdown for selecting languages */}
      <select
        value={i18n.language} // Set the selected language
        onChange={handleChange} // Update language when selected
        className="block appearance-none w-full bg-cyan-700 dark:bg-gray-700 border border-cyan-700 dark:border-gray-700 text-white font-medium dark:text-cyan-50 py-[6px] px-4 pr-8 rounded-lg leading-tight focus:outline-none"
      >
        {/* Render options from the languages array */}
        {languages.map((lng) => (
          <option 
            key={lng.value} 
            value={lng.value}
            className={`bg-cyan-100 text-black dark:bg-gray-800 dark:text-white`}
          >
            {lng.label}
          </option>
        ))}
      </select>

      {/* Icon for dropdown */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-white dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
