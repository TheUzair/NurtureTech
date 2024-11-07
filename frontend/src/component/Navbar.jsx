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
    <nav className="bg-cyan-900 dark:bg-black sticky top-0 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="text-cyan-50 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AspireIt</div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {/* Sign out button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="dark:bg-gray-700 dark:text-white bg-cyan-700 hover:bg-cyan-800 text-cyan-50 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            Sign out
          </button>

          {/* Language dropdown */}
          <div className="mb-2 rounded-lg">
            <LanguageSelector />
          </div>

          {/* Toggle theme button */}
          <button
            type="button"
            onClick={toggleTheme}
            className=""
          >
            <img
              src={theme === 'dark' ? '/sun.png' : '/moon.png'}
              alt={theme === 'dark' ? 'Sun' : 'Moon'}
              className={`inline mb-2 ${theme === 'dark' ? 'w-8 h-8' : 'w-9 h-9 invert'}`}
            />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
