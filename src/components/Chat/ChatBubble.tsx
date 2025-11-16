import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { MessageSender } from '@/types/chat';
import styles from './chat.module.css';

interface ChatBubbleProps {
  sender: MessageSender;
  children: ReactNode;
  delay?: number;
  profileImageUrl?: string;
  isFirstMessage?: boolean;
}

export const ChatBubble = ({
  sender,
  children,
  delay = 0,
  profileImageUrl,
  isFirstMessage = false
}: ChatBubbleProps) => {
  const isBot = sender === 'bot';

  return (
    <motion.div
      className={isBot ? styles.botMessageContainer : styles.userMessageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {/* Profile image for bot (left side) */}
      {isBot && profileImageUrl && (
        <img
          src={profileImageUrl}
          alt="Bot"
          className={styles.profileImage}
        />
      )}

      <div className={`${isBot ? styles.botBubble : styles.userBubble} ${isFirstMessage ? styles.firstMessageBubble : ''}`}>
        {children}
      </div>

      {/* Profile image for user (right side) */}
      {!isBot && profileImageUrl && (
        <img
          src={profileImageUrl}
          alt="User"
          className={styles.profileImage}
        />
      )}
    </motion.div>
  );
};
