import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { ChatBubble } from './ChatBubble';
import { ChatOptions } from './ChatOptions';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import type { ChatTopic } from '@/types/chat';
import styles from './chat.module.css';

const PROFILE_IMAGE_URL = '/img/IMG_2601-1365x2048.jpg';

interface ChatInterfaceProps {
  initialTopic?: ChatTopic | null;
  onClose?: () => void;
}

export const ChatInterface = ({ initialTopic = null, onClose }: ChatInterfaceProps) => {
  const {
    state,
    selectTopic,
    submitMessage,
    submitName,
    submitEmail,
    submitZeitraum,
    submitPreferredTime,
    confirmSubmission,
    resetChat,
  } = useChat(initialTopic);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive (within chat container only)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [state.messages]);

  // Handle chat close/reset with parent callback
  const handleReset = () => {
    resetChat();
    if (onClose) {
      onClose();
    }
  };

  const renderOptions = () => {
    // Topic selection - skip if initialTopic was provided
    if (state.step === 'topic-selection' && !initialTopic) {
      return (
        <ChatOptions
          options={[
            { label: '💬 Eine Frage stellen', value: 'frage' },
            { label: '🎓 Ein Webinar buchen', value: 'webinar' },
          ]}
          onSelect={(value) => selectTopic(value as ChatTopic)}
          disabled={state.isLoading}
          stacked={true}
        />
      );
    }

    // Confirmation
    if (state.step === 'confirmation') {
      return (
        <ChatOptions
          options={[
            { label: 'Ja, bitte senden!', value: 'confirm' },
            { label: 'Nein, nochmal von vorne', value: 'reset' },
          ]}
          onSelect={(value) => confirmSubmission(value === 'confirm')}
          disabled={state.isLoading}
        />
      );
    }

    return null;
  };

  const renderInput = () => {
    // Always show input, but disable it when options are active
    if (state.step === 'message-input') {
      return (
        <ChatInput
          onSubmit={submitMessage}
          placeholder="Deine Nachricht..."
          disabled={state.isLoading}
          error={state.error}
        />
      );
    }

    if (state.step === 'name-input') {
      return (
        <ChatInput
          onSubmit={submitName}
          placeholder="Dein Name"
          disabled={state.isLoading}
          error={state.error}
        />
      );
    }

    if (state.step === 'email-input') {
      return (
        <ChatInput
          onSubmit={submitEmail}
          placeholder="deine@email.de"
          type="email"
          disabled={state.isLoading}
          error={state.error}
        />
      );
    }

    if (state.step === 'zeitraum-input') {
      return (
        <ChatInput
          onSubmit={submitZeitraum}
          placeholder="z.B. 'nächste 2 Wochen', 'im März'"
          disabled={state.isLoading}
          error={state.error}
        />
      );
    }

    if (state.step === 'preferred-time-input') {
      return (
        <ChatInput
          onSubmit={submitPreferredTime}
          placeholder="z.B. 'Montags nachmittags', 'Dienstag ab 18 Uhr'"
          disabled={state.isLoading}
          error={state.error}
        />
      );
    }

    // For success/error/sending/options states - show disabled placeholder input
    return (
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={`${styles.input} ${styles.inputDisabled}`}
            placeholder={
              state.step === 'success' ? 'Nachricht gesendet!' :
              state.step === 'error' ? 'Fehler beim Senden' :
              state.step === 'sending' ? 'Wird gesendet...' :
              'Wähle eine Option aus...'
            }
            disabled={true}
            readOnly
          />
        </div>
        {(state.step === 'success' || state.step === 'error') && (
          <motion.button
            className={styles.resetButton}
            onClick={handleReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {onClose ? 'Zurück' : 'Neue Nachricht'}
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {state.messages.map((message, idx) => (
          <ChatBubble
            key={message.id}
            sender={message.sender}
            profileImageUrl={message.sender === 'bot' ? PROFILE_IMAGE_URL : undefined}
            isFirstMessage={idx === 0 && state.step === 'topic-selection'}
          >
            {message.content.split('\n').map((line, i) => {
              // Handle bold text (markdown-style **)
              if (line.includes('**')) {
                const parts = line.split('**');
                return (
                  <p key={i} className={styles.messageLine}>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              return line ? (
                <p key={i} className={styles.messageLine}>
                  {line}
                </p>
              ) : null;
            })}
          </ChatBubble>
        ))}
        {renderOptions()}
        {state.isTyping && <TypingIndicator profileImageUrl={PROFILE_IMAGE_URL} />}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>{renderInput()}</div>
    </div>
  );
};
