import { fetchData } from '../../helper/commonHelper';

export const login = async (username: string, password: string) => {
  const response = await fetchData({
    url: '/auth/login',
    method: 'POST',
    body: { username, password },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }

  return data.user;
};

export const checkAuth = async () => {
  const response = await fetchData({
    url: '/auth/check-auth',
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No autenticado');
  }

  return data.user;
};

export const logout = async () => {
  const response = await fetchData({
    url: '/auth/logout',
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  return true;
};
