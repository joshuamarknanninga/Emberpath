import { useEffect, useState } from 'react';
import { request } from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('emberpath_token');
    if (!token) return;
    request('/api/auth/profile').then(setUser).catch(() => localStorage.removeItem('emberpath_token'));
  }, []);

  const login = async (email, password) => {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('emberpath_token', data.token);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    localStorage.setItem('emberpath_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('emberpath_token');
    setUser(null);
  };

  return { user, setUser, login, register, logout };
};
