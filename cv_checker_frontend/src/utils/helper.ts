import config from '@/common/config';
import { cookies } from 'next/headers';

// Helper function to normalize text for searching
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim();
};

export const getToken = () => {
  const token = cookies().get(config.accessTokenKey || 'access_token');
  return token;
};
