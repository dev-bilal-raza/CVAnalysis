'use server';
import { cookies } from 'next/headers';
import config from '@/common/config';

export const getToken = async () => {
  const token = cookies().get(config.accessTokenKey || 'access_token');
  if (!token) {
    return null;
  }
  return token?.value;
};
export const removeToken = async () => {
  cookies().delete(config.accessTokenKey || 'access_token');
};
