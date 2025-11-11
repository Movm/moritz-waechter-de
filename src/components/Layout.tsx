import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  // Update document title if provided
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | Moritz Wächter`;
    } else {
      document.title = 'Moritz Wächter';
    }
  }, [title]);

  // Update meta description if provided
  React.useEffect(() => {
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [description]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};
