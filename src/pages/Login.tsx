import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Shield } from 'lucide-react';
import { BRANDING } from '../constants/branding';
import { THEME } from '../constants/theme';
import LoginForm from '../components/auth/LoginForm';
import SocialAuth from '../components/auth/SocialAuth';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/messages" replace />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-colors"
      style={{ backgroundImage: `url(${THEME.backgroundImage})` }}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <img
            src={BRANDING.logo.url}
            alt={BRANDING.logo.alt}
            className="h-12 mx-auto mb-6"
          />
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Secure Medical Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            HIPAA Compliant Communication Platform
          </p>
        </div>
        
        <LoginForm />
        <SocialAuth />
      </div>
    </div>
  );
}