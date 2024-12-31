import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Sidebar from './Sidebar';
import { BRANDING } from '../constants/branding';

export default function Layout() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="h-16 bg-white border-b flex items-center px-6">
          <img 
            src={BRANDING.logo.url}
            alt={BRANDING.logo.alt}
            className="h-8"
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
}