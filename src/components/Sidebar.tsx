import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuthStore();

  const navigation = [
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Contacts', href: '/contacts', icon: Users },
  ];

  return (
    <div className="w-64 bg-white border-r">
      <div className="h-full flex flex-col">
        <div className="h-16 border-b flex items-center px-4">
          <h1 className="text-xl font-semibold text-[#662d91]">Medical Portal</h1>
        </div>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-purple-50 text-[#662d91]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#662d91]'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <button
            onClick={() => signOut()}
            className="flex items-center text-sm text-gray-600 hover:text-[#662d91]"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}