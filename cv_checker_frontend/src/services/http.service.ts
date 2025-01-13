import config from '@/common/config';
import { getToken } from './cookie.service';
const api = config.apiV1Url;

const makeRequest = async (
  url: string,
  type: string,
  data?: any,
  queryParams?: Record<string, any>,
  authRequired: boolean = true
) => {
  try {
    // Construct query string for GET requests with queryParams
    const queryString = queryParams
      ? '?' + new URLSearchParams(queryParams).toString()
      : '';

    const fullUrl = api + url + queryString;

    // Determine headers and body
    const headers: Record<string, string> = {};
    let body: BodyInit | null = null;

    // Prepare request body based on data type
    if (data) {
      if (data instanceof FormData) {
        // headers['Content-Type'] = 'multipart/form-data';
        body = data; // Handle FormData for documents/images
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data); // Handle JSON data
      }
    }
    if (authRequired) {
      const token = getToken();
      console.log('token', token);
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the API call using fetch
    const response = await fetch(fullUrl, {
      method: type,
      headers,
      body: type === 'GET' ? null : body,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export default makeRequest;
