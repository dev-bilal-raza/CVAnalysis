'use server';
import makeRequest from '@/services/http.service';

const BASE_URL = '/users';

interface IResponse {
  status: number;
  message?: string;
}
interface IUser {
  user_name: string;
  email: string;
  is_active: boolean;
  avatar_url: string;
  user_id: string;
}

interface IUserResponse extends IResponse {
  user: IUser;
}

export const getUserDetails = async (): Promise<IUserResponse> => {
  return makeRequest(`${BASE_URL}/get_user_details`, 'GET');
};
