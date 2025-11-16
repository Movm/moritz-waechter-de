import type {ReactNode} from 'react';
import { motion } from 'framer-motion';
import { TextMarker } from './TextMarker';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  markedWord?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}

export const Hero = ({ title, markedWord, subtitle, image, imageAlt }: HeroProps): ReactNode => {
  const hasImage = Boolean(image);

  const renderTitle = () => {
    if (!markedWord) {
      return title;
    }

    const parts = title.split(markedWord);
    if (parts.length === 1) {
      return title;
    }

    return (
      <>
        {parts[0]}
        <TextMarker>{markedWord}</TextMarker>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.section
      className={`${styles.heroSection} ${!hasImage ? styles.textOnly : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className={styles.heroContent}>
        {hasImage && (
          <div className={styles.heroImageColumn}>
            <img
              src={image}
              alt={imageAlt || ''}
              className={styles.profileImage}
            />
          </div>
        )}
        <div className={styles.heroText}>
          <h1 className={styles.mainHeading}>
            {renderTitle()}
          </h1>
          {subtitle && (
            <p className={styles.heroSubtext}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
};
