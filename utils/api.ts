// src/utils/api.ts

import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchOptions {
  method?: string;
  headers?: any;
  body?: any;
  params?: any;
}

const getAuthHeaders = async () => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  const bpToken = await AsyncStorage.getItem('BP_TOKEN');

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'bp-token': bpToken,
  };
};

export const apiFetch = async (endpoint: string, options: FetchOptions = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // Append query parameters if any
  if (options.params) {
    Object.keys(options.params).forEach(key => {
      if (options.params[key] !== undefined && options.params[key] !== null) {
        url.searchParams.append(key, options.params[key]);
      }
    });
  }

  const headers = await getAuthHeaders();

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...headers,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url.toString(), fetchOptions);

    const data = await response.json();

    if (!response.ok) {
      // Adjust based on your backend error response structure
      const errorMessage = data.message || data.error || 'Error en la petición';
      throw new Error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};
