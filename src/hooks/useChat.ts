import { useState, useCallback } from 'react';
import type {
  ChatState,
  ChatMessage,
  ChatTopic,
  ChatFormData,
} from '@/types/chat';
import {
  validateEmail,
  validateName,
  validateMessage,
  validateZeitraum,
  validatePreferredTime,
} from '@/schemas/chatValidation';
import { sendChatEmail } from '@/services/api';

const initialFormData: ChatFormData = {
  topic: null,
  message: '',
  name: '',
  email: '',
  zeitraum: '',
  preferredTime: '',
};

const createMessage = (
  sender: 'bot' | 'user',
  content: string
): ChatMessage => ({
  id: `${Date.now()}-${Math.random()}`,
  sender,
  content,
  timestamp: new Date(),
});

export const useChat = (initialTopic: ChatTopic | null = null) => {
  // Determine initial state based on whether a topic is pre-selected
  const getInitialState = (): ChatState => {
    if (initialTopic) {
      // If topic is pre-selected, skip topic selection and go straight to message input
      const topicLabel = initialTopic === 'frage' ? 'Eine Frage stellen' : 'Ein Webinar buchen';
      const botMessage =
        initialTopic === 'frage'
          ? 'Super! Was möchtest du mich fragen?'
          : 'Großartig! Welches Webinar möchtest du buchen?';

      return {
        step: 'message-input',
        messages: [
          createMessage('bot', 'Wie kann ich dir helfen?'),
          createMessage('user', topicLabel),
          createMessage('bot', botMessage),
        ],
        formData: { ...initialFormData, topic: initialTopic },
        isLoading: false,
        error: null,
        isTyping: false,
      };
    }

    // Default state when no topic is pre-selected
    return {
      step: 'topic-selection',
      messages: [
        createMessage('bot', 'Wie kann ich dir helfen?'),
      ],
      formData: initialFormData,
      isLoading: false,
      error: null,
      isTyping: false,
    };
  };

  const [state, setState] = useState<ChatState>(getInitialState());

  // Add a message to the chat
  const addMessage = useCallback((sender: 'bot' | 'user', content: string) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, createMessage(sender, content)],
    }));
  }, []);

  // Show typing indicator
  const showTyping = useCallback(() => {
    setState((prev) => ({ ...prev, isTyping: true }));
  }, []);

  // Hide typing indicator
  const hideTyping = useCallback(() => {
    setState((prev) => ({ ...prev, isTyping: false }));
  }, []);

  // Handle topic selection
  const selectTopic = useCallback((topic: ChatTopic) => {
    const topicLabel = topic === 'frage' ? 'Eine Frage stellen' : 'Ein Webinar buchen';

    addMessage('user', topicLabel);
    showTyping();

    setTimeout(() => {
      hideTyping();

      const botMessage =
        topic === 'frage'
          ? 'Super! Was möchtest du mich fragen?'
          : 'Großartig! Welches Webinar möchtest du buchen?';

      addMessage('bot', botMessage);

      setState((prev) => ({
        ...prev,
        step: 'message-input',
        formData: { ...prev.formData, topic },
      }));
    }, 500);
  }, [addMessage, showTyping, hideTyping]);

  // Handle message input
  const submitMessage = useCallback((message: string) => {
    const error = validateMessage(message);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    addMessage('user', message);
    showTyping();

    setTimeout(() => {
      hideTyping();
      const topic = state.formData.topic;

      // For webinar bookings, ask for zeitraum next
      if (topic === 'webinar') {
        addMessage('bot', 'Super! In welchem Zeitraum möchtest du das Webinar buchen? (z.B. "nächste 2 Wochen", "im März", "Anfang April")');
        setState((prev) => ({
          ...prev,
          step: 'zeitraum-input',
          formData: { ...prev.formData, message },
          error: null,
        }));
        return;
      }

      // For questions, ask for name
      const responseMessage = 'Super, die Frage beantworte ich dir gerne! Dafür brauche ich noch deinen Namen.';
      addMessage('bot', responseMessage);
      setState((prev) => ({
        ...prev,
        step: 'name-input',
        formData: { ...prev.formData, message },
        error: null,
      }));
    }, 500);
  }, [addMessage, showTyping, hideTyping, state.formData.topic]);

  // Handle name input
  const submitName = useCallback((name: string) => {
    const error = validateName(name);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    addMessage('user', name);
    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage('bot', 'Und wie lautet deine E-Mail-Adresse?');
      setState((prev) => ({
        ...prev,
        step: 'email-input',
        formData: { ...prev.formData, name },
        error: null,
      }));
    }, 500);
  }, [addMessage, showTyping, hideTyping]);

  // Handle email input
  const submitEmail = useCallback((email: string) => {
    const error = validateEmail(email);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    addMessage('user', email);
    showTyping();

    setTimeout(() => {
      hideTyping();
      setState((prev) => {
        const { topic, message, name, zeitraum, preferredTime } = prev.formData;
        const topicLabel = topic === 'frage' ? 'Frage' : 'Webinar-Buchung';

        // Build confirmation message based on topic
        let confirmationMessage = `
Perfekt! Lass mich kurz zusammenfassen:

**Art:** ${topicLabel}
**Nachricht:** ${message}
**Name:** ${name}
**E-Mail:** ${email}`;

        // Add webinar-specific fields if present
        if (topic === 'webinar' && zeitraum && preferredTime) {
          confirmationMessage += `
**Zeitraum:** ${zeitraum}
**Bevorzugte Zeiten:** ${preferredTime}`;
        }

        confirmationMessage += `

Ist alles korrekt?`;

        return {
          ...prev,
          step: 'confirmation',
          formData: { ...prev.formData, email },
          error: null,
          messages: [...prev.messages, createMessage('bot', confirmationMessage.trim())],
        };
      });
    }, 500);
  }, [addMessage, showTyping, hideTyping]);

  // Handle zeitraum input
  const submitZeitraum = useCallback((zeitraum: string) => {
    const error = validateZeitraum(zeitraum);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    addMessage('user', zeitraum);
    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage('bot', 'Perfekt! Hast du bevorzugte Tage oder Uhrzeiten? (z.B. "Montags und Mittwochs nachmittags", "Dienstag oder Donnerstag ab 18 Uhr")');
      setState((prev) => ({
        ...prev,
        step: 'preferred-time-input',
        formData: { ...prev.formData, zeitraum },
        error: null,
      }));
    }, 500);
  }, [addMessage, showTyping, hideTyping]);

  // Handle preferred time input
  const submitPreferredTime = useCallback((preferredTime: string) => {
    const error = validatePreferredTime(preferredTime);
    if (error) {
      setState((prev) => ({ ...prev, error }));
      return;
    }

    addMessage('user', preferredTime);
    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage('bot', 'Perfekt! Wie heißt du?');
      setState((prev) => ({
        ...prev,
        step: 'name-input',
        formData: { ...prev.formData, preferredTime },
        error: null,
      }));
    }, 500);
  }, [addMessage, showTyping, hideTyping]);

  // Handle confirmation
  const confirmSubmission = useCallback(async (confirmed: boolean) => {
    if (!confirmed) {
      // Reset to topic selection
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessage('bot', 'Kein Problem! Lass uns von vorne beginnen.');
        setState((prev) => ({
          ...prev,
          step: 'topic-selection',
          formData: initialFormData,
          error: null,
        }));
      }, 500);
      return;
    }

    // User confirmed, send email
    addMessage('user', 'Ja, bitte senden!');

    setState((prev) => ({
      ...prev,
      step: 'sending',
      isLoading: true,
      error: null,
    }));

    showTyping();

    setTimeout(async () => {
      try {
        const { topic, message, name, email, zeitraum, preferredTime } = state.formData;

        if (!topic) {
          throw new Error('Topic is required');
        }

        await sendChatEmail({
          topic,
          message,
          name,
          email,
          zeitraum,
          preferredTime,
        });

        hideTyping();
        addMessage('bot', 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Ich melde mich in Kürze bei dir!');

        setState((prev) => ({
          ...prev,
          step: 'success',
          isLoading: false,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';

        hideTyping();
        addMessage('bot', `Entschuldigung, es gab ein Problem: ${errorMessage}`);

        setState((prev) => ({
          ...prev,
          step: 'error',
          isLoading: false,
          error: errorMessage,
        }));
      }
    }, 500);
  }, [state.formData, addMessage, showTyping, hideTyping]);

  // Reset chat
  const resetChat = useCallback(() => {
    setState({
      step: 'topic-selection',
      messages: [createMessage('bot', 'Wie kann ich dir helfen?')],
      formData: initialFormData,
      isLoading: false,
      error: null,
      isTyping: false,
    });
  }, []);

  return {
    state,
    selectTopic,
    submitMessage,
    submitName,
    submitEmail,
    submitZeitraum,
    submitPreferredTime,
    confirmSubmission,
    resetChat,
  };
};
