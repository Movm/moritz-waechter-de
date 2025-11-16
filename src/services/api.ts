import type { SendEmailRequest, SendEmailResponse } from '@/types/chat';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Send email via API
 */
export const sendChatEmail = async (
  data: SendEmailRequest
): Promise<SendEmailResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/chat/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle different error cases
      if (response.status === 429) {
        throw new ApiError(
          'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.',
          429,
          'RATE_LIMIT'
        );
      }

      if (response.status === 400) {
        throw new ApiError(
          result.error || 'Ungültige Eingabedaten.',
          400,
          'VALIDATION_ERROR'
        );
      }

      if (response.status >= 500) {
        throw new ApiError(
          'Server-Fehler. Bitte versuche es später erneut.',
          response.status,
          'SERVER_ERROR'
        );
      }

      throw new ApiError(
        result.error || 'Ein Fehler ist aufgetreten.',
        response.status,
        'UNKNOWN_ERROR'
      );
    }

    return result;
  } catch (error) {
    // Network error or other non-HTTP error
    if (error instanceof ApiError) {
      throw error;
    }

    // Network/connection error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Verbindung zum Server fehlgeschlagen. Bitte überprüfe deine Internetverbindung.',
        0,
        'NETWORK_ERROR'
      );
    }

    // Unknown error
    throw new ApiError(
      'Ein unerwarteter Fehler ist aufgetreten.',
      0,
      'UNKNOWN_ERROR'
    );
  }
};
