import { cookies } from 'next/headers';
import config from '@/common/config';

export const getToken = () => {
  const token = cookies().get(config.accessTokenKey || 'access_token');
  return token;
};
