import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogoGoogle, LogoMicrosoft } from '../../components/icons/Logos';

export default function SocialAuth() {
  const { signInWithProvider } = useAuthStore();

  return (
    <div className="space-y-3">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <button
        onClick={() => signInWithProvider('google')}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <LogoGoogle className="h-5 w-5" />
        Google
      </button>
      
      <button
        onClick={() => signInWithProvider('microsoft')}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <LogoMicrosoft className="h-5 w-5" />
        Microsoft
      </button>
    </div>
  );
}