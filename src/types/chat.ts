export type MessageSender = 'bot' | 'user';

export type ChatStep =
  | 'welcome'
  | 'topic-selection'
  | 'message-input'
  | 'name-input'
  | 'email-input'
  | 'zeitraum-input'
  | 'preferred-time-input'
  | 'confirmation'
  | 'sending'
  | 'success'
  | 'error';

export type ChatTopic = 'frage' | 'webinar';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: Date;
  isOption?: boolean;
}

export interface ChatFormData {
  topic: ChatTopic | null;
  message: string;
  name: string;
  email: string;
  zeitraum?: string;
  preferredTime?: string;
}

export interface ChatOptionButton {
  label: string;
  value: string;
}

export interface ChatState {
  step: ChatStep;
  messages: ChatMessage[];
  formData: ChatFormData;
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
}

export interface SendEmailRequest {
  topic: ChatTopic;
  message: string;
  name: string;
  email: string;
  zeitraum?: string;
  preferredTime?: string;
  honeypot?: string;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface ChatStepConfig {
  botMessage: string;
  inputType: 'text' | 'options' | 'email' | 'none';
  options?: ChatOptionButton[];
  nextStep: ChatStep | ((formData: ChatFormData) => ChatStep);
  validation?: (value: string) => string | null;
  placeholder?: string;
}
