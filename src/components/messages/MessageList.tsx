import React from 'react';
import { Message } from '../../types';
import MessageBubble from './MessageBubble';

interface Props {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.sender_id === currentUserId}
        />
      ))}
      {messages.length === 0 && (
        <div className="text-center text-gray-500">
          No messages yet. Start a conversation!
        </div>
      )}
    </div>
  );
}