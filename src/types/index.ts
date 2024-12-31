export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  avatar_url?: string;
  provider?: 'google' | 'microsoft' | 'email';
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  read: boolean;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message?: Message;
  updated_at: string;
}