import React, { useState } from 'react';
import { Send } from 'lucide-react';
import FileUpload from './FileUpload';
import { uploadFile } from '../../lib/fileStorage';
import { FileAttachment } from '../../types';
import { useAuthStore } from '../../store/authStore';

interface Props {
  onSend: (message: string, attachments?: FileAttachment[]) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachments.length > 0) && !disabled && !uploading) {
      onSend(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!user) return;
    
    setUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        files.map(file => uploadFile(file, user.id))
      );
      setAttachments(prev => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1 space-y-2">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map(file => (
              <div key={file.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {file.name}
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <FileUpload onUpload={handleFileUpload} />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled || uploading}
            placeholder={disabled ? 'Select a contact first' : 'Type a message...'}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={disabled || uploading || (!message.trim() && attachments.length === 0)}
        className="rounded-md bg-blue-600 p-2 text-white disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}