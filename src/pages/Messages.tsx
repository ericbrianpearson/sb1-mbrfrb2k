import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Message } from '../types';
import MessageList from '../components/messages/MessageList';
import MessageInput from '../components/messages/MessageInput';
import ContactSelect from '../components/messages/ContactSelect';

export default function Messages() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  useEffect(() => {
    if (selectedContact) {
      loadMessages();
    }
  }, [selectedContact]);

  const loadMessages = async () => {
    if (!selectedContact) return;
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${user?.id},recipient_id.eq.${user?.id}`)
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setMessages(data);
    }
  };

  const sendMessage = async (content: string) => {
    if (!selectedContact || !content.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user?.id,
        recipient_id: selectedContact,
        content: content.trim()
      });

    if (!error) {
      loadMessages();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white">
        <ContactSelect onSelect={setSelectedContact} selected={selectedContact} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} currentUserId={user?.id || ''} />
      </div>
      <div className="p-4 border-t bg-white">
        <MessageInput onSend={sendMessage} disabled={!selectedContact} />
      </div>
    </div>
  );
}