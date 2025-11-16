import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { nameSchema, emailSchema, messageSchema } from '@/schemas/chatValidation';
import { useContactForm } from '@/hooks/useContactForm';
import styles from './ContactForm.module.css';

// Form schema combining the individual field schemas
const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  honeypot: z.string().max(0).optional(), // Anti-spam field
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm(): ReactNode {
  const { submitForm, isSubmitting, submitStatus, errorMessage } = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const success = await submitForm(data);
    if (success) {
      reset(); // Clear form on success
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Honeypot field - hidden from users, should remain empty */}
      <input
        type="text"
        {...register('honeypot')}
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        aria-hidden="true"
      />

      {/* Name and Email fields - side by side on desktop */}
      <div className={styles.fieldRow}>
        {/* Name field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            {...register('name')}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            disabled={isSubmitting}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className={styles.errorText} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            E-Mail
          </label>
          <input
            id="contact-email"
            type="email"
            {...register('email')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            disabled={isSubmitting}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={styles.errorText} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Message field */}
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Nachricht
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          rows={5}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          disabled={isSubmitting}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className={styles.errorText} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonLoading : ''}`}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>

      {/* Status messages */}
      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="polite"
          >
            <svg className={styles.messageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Danke! Deine Nachricht wurde versendet.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && errorMessage && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="assertive"
          >
            <svg className={styles.messageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
