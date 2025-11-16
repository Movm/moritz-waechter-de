import { motion } from 'framer-motion';
import type { ChatOptionButton } from '@/types/chat';
import styles from './chat.module.css';

interface ChatOptionsProps {
  options: ChatOptionButton[];
  onSelect: (value: string) => void;
  disabled?: boolean;
  stacked?: boolean;
}

export const ChatOptions = ({ options, onSelect, disabled = false, stacked = false }: ChatOptionsProps) => {
  return (
    <div className={styles.optionsMessageContainer}>
      <motion.div
        className={stacked ? styles.optionsContainerStacked : styles.optionsContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            className={stacked ? styles.optionButtonLarge : styles.optionButton}
            onClick={() => onSelect(option.value)}
            disabled={disabled}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
