import { supabase } from './supabase';
import { FileAttachment } from '../types';

export async function uploadFile(file: File, userId: string): Promise<FileAttachment> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('attachments')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('attachments')
    .getPublicUrl(filePath);

  return {
    id: fileName,
    name: file.name,
    size: file.size,
    type: file.type,
    url: publicUrl,
    created_at: new Date().toISOString()
  };
}