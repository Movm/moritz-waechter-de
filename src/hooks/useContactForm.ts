import { useState } from 'react';
import { sendChatEmail, ApiError } from '@/services/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  submitForm: (data: ContactFormData) => Promise<boolean>;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  errorMessage: string | null;
}

/**
 * Custom hook for handling contact form submission
 * Integrates with the existing Mailgun email API
 */
export function useContactForm(): UseContactFormReturn {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitForm = async (data: ContactFormData): Promise<boolean> => {
    // Check honeypot field - if filled, it's likely a bot
    if (data.honeypot) {
      console.warn('Honeypot field was filled - potential spam');
      setSubmitStatus('error');
      setErrorMessage('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      return false;
    }

    setSubmitStatus('submitting');
    setErrorMessage(null);

    try {
      // Send email via existing API endpoint
      await sendChatEmail({
        topic: 'frage', // Hardcoded for general contact form
        name: data.name,
        email: data.email,
        message: data.message,
        honeypot: data.honeypot,
      });

      setSubmitStatus('success');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

      return true;
    } catch (error) {
      setSubmitStatus('error');

      // Handle different error types with German messages
      if (error instanceof ApiError) {
        switch (error.status) {
          case 429:
            setErrorMessage('Zu viele Anfragen. Bitte warte 15 Minuten.');
            break;
          case 400:
            setErrorMessage('Bitte überprüfe deine Eingaben.');
            break;
          case 500:
            setErrorMessage('Etwas ist schiefgelaufen. Bitte versuche es später erneut.');
            break;
          default:
            setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
      } else {
        // Network error or unknown error
        setErrorMessage('Verbindung fehlgeschlagen. Bitte überprüfe deine Internetverbindung.');
      }

      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage(null);
      }, 8000);

      return false;
    }
  };

  return {
    submitForm,
    isSubmitting: submitStatus === 'submitting',
    submitStatus,
    errorMessage,
  };
}
