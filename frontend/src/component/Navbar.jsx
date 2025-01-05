import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './language-selector';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  dark:from-slate-800 dark:via-slate-900 dark:to-black text-white z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
      <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/icons/book-heart.png"
            alt="NurtureTech Logo"
            className="h-8 w-8"
          />
          <span className="text-white text-2xl font-semibold whitespace-nowrap">
            NurtureTech
          </span>
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {/* Sign out button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="bg-white/10 hover:bg-white/20 text-white 
                     dark:bg-gray-700 dark:hover:bg-gray-600 
                     font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
                     transition-colors"
          >
            {t('sign_out')}
          </button>

          {/* Language dropdown */}
          <div className="mb-2 rounded-lg">
            <LanguageSelector />
          </div>

          {/* Toggle theme button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg mb-2"
          >
            <img
              src={theme === 'dark' ? '/sun.png' : '/moon.png'}
              alt={theme === 'dark' ? 'Sun' : 'Moon'}
              className={`inline ${theme === 'dark' ? 'w-6 h-6' : 'w-6 h-6 invert'}`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;