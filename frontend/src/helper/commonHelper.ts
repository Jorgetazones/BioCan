import { getEnvVariables } from './varsHelper';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetchDataParams {
  url: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
  credentials?: 'include' | 'same-origin';
}

export const fetchData = async ({
  url,
  method = 'GET',
  body,
}: FetchDataParams) => {
  const api = getEnvVariables().BASE_URL;

  const isFormData = body instanceof FormData;

  return await fetch(`${api}${url}`, {
    method,
    headers: isFormData
      ? undefined
      : {
          'Content-Type': 'application/json',
        },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: 'include',
  });
};

// Función para actualizar los datos del usuario
export const updateUserData = async (
  userId: number,
  userData: Record<string, unknown>
) => {
  try {
    const response = await fetchData({
      url: `/users/${userId}`,
      method: 'PUT',
      body: userData,
    });

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    throw error;
  }
};
