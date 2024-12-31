import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { Users } from 'lucide-react';

export default function Contacts() {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name');
      
    if (!error && data) {
      setContacts(data);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center">
        <Users className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border-b last:border-b-0 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium text-gray-900">{contact.full_name}</h3>
              <p className="text-sm text-gray-500">{contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}