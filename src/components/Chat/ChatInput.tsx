import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import styles from './chat.module.css';

interface ChatInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email';
  error?: string | null;
}

export const ChatInput = ({
  onSubmit,
  placeholder = 'Deine Nachricht...',
  disabled = false,
  type = 'text',
  error = null,
}: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      className={styles.inputContainer}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className={styles.inputWrapper}>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          autoFocus
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className={styles.sendButton}
          aria-label="Senden"
        >
          <svg
            className={styles.sendIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
      {error && (
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.form>
  );
};
