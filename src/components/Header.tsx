import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMoon, HiSun, HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsAtTop(!scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 right-6 z-50">
      <nav className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-lg overflow-hidden">
        {/* Header Top Section */}
        <div className="flex items-center justify-between gap-x-2 md:gap-x-6 pl-1 pr-3 md:px-6 py-3">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Logo / Title - Always visible on desktop, conditional on mobile based on scroll */}
            {/* Desktop: Always show */}
            <Link
              to="/"
              onClick={closeMenu}
              className="hidden md:block font-display font-bold text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 whitespace-nowrap"
            >
              Moritz
            </Link>

            {/* Mobile: Show at top OR when menu is open */}
            <AnimatePresence mode="wait" initial={false}>
              {(isAtTop || isMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden"
                >
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="font-display font-bold text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 whitespace-nowrap"
                  >
                    Moritz
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
              <Link
                to="/ueber-mich"
                className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 whitespace-nowrap"
              >
                Über mich
              </Link>
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

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:block hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out p-1"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <HiSun className="w-5 h-5 text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200" />
              ) : (
                <HiMoon className="w-5 h-5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200" />
              )}
            </button>
          </div>

          {/* Mobile Hamburger/Close Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden hover:scale-110 active:scale-95 transition-transform duration-200 ease-in-out p-1"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiX className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiMenu className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              initial={{ gridTemplateRows: '0fr', opacity: 0 }}
              animate={{ gridTemplateRows: '1fr', opacity: 1 }}
              exit={{ gridTemplateRows: '0fr', opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut'
              }}
              className="md:hidden grid border-t border-white/20 dark:border-gray-700/30"
            >
              <div className="overflow-hidden" style={{ minHeight: 0 }}>
                <div className="px-6 py-4 space-y-3">
                  {/* Navigation Links */}
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Home
                  </Link>

                  <Link
                    to="/ueber-mich"
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Über mich
                  </Link>

                  <Link
                    to="/projekte"
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Grünerator
                  </Link>

                  <Link
                    to="/webinare"
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Webinare
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
