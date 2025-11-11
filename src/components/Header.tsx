import React from 'react';
import { Link } from 'react-router-dom';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '@/contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-6 right-6 z-50 transition-all duration-300 ease-in-out">
      <nav className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-full shadow-lg px-6 py-3 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Logo / Title */}
          <Link
            to="/"
            className="font-display font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 whitespace-nowrap"
          >
            Moritz
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/projekte"
              className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Grünerator
            </Link>
            <Link
              to="/webinare"
              className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Webinare
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out p-1"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <HiSun className="w-5 h-5 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200" />
            ) : (
              <HiMoon className="w-5 h-5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
