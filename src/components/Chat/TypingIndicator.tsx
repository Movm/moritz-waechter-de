import { motion } from 'framer-motion';
import styles from './chat.module.css';

interface TypingIndicatorProps {
  profileImageUrl?: string;
}

export const TypingIndicator = ({ profileImageUrl }: TypingIndicatorProps) => {
  return (
    <motion.div
      className={styles.botMessageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {profileImageUrl && (
        <img
          src={profileImageUrl}
          alt="Bot"
          className={styles.profileImage}
        />
      )}
      <div className={styles.typingBubble}>
        <div className={styles.typingDots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </motion.div>
  );
};
