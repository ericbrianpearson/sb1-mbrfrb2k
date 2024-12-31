import { supabase } from './supabase';

export async function createTestUser() {
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: 'test@catalight.org',
    password: 'Test123!@#',
  });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error('User creation failed');
  }

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      full_name: 'Test User',
      email: 'test@catalight.org'
    });

  if (profileError) {
    throw profileError;
  }

  return {
    email: 'test@catalight.org',
    password: 'Test123!@#'
  };
}