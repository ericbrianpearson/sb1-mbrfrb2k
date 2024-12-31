import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '../../types';

interface Props {
  onSelect: (userId: string | null) => void;
  selected: string | null;
}

export default function ContactSelect({ onSelect, selected }: Props) {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (!error && data) {
      setContacts(data);
    }
  };

  return (
    <select
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select a contact...</option>
      {contacts.map((contact) => (
        <option key={contact.id} value={contact.id}>
          {contact.full_name}
        </option>
      ))}
    </select>
  );
}