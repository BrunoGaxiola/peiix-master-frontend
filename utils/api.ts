// src/utils/api.ts

import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchOptions {
  method?: string;
  headers?: any;
  body?: any;
  params?: any;
}

type ResponseType = 'json' | 'blob' | 'text';

const getAuthHeaders = async () => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  const bpToken = await AsyncStorage.getItem('BP_TOKEN');

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'bp-token': bpToken,
  };
};

export const apiFetch = async (
  endpoint: string,
  options: FetchOptions = {},
  responseType: ResponseType = 'json'
) => {
  const url = new URL(`http://10.41.50.48:5000${endpoint}`);

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

    let data;

    if (responseType === 'json') {
      data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message || data.error || 'Error en la petición';
        throw new Error(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      }
    } else if (responseType === 'blob') {
      data = await response.blob();
      if (!response.ok) {
        // Intentar obtener el mensaje de error del blob si es posible
        const errorText = await response.text();
        throw new Error(errorText || 'Error al descargar el archivo.');
      }
    } else if (responseType === 'text') {
      data = await response.text();
      if (!response.ok) {
        throw new Error(data || 'Error en la petición.');
      }
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};
