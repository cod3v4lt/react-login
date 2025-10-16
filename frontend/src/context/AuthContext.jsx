// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await axios.get(`${apiUrl}/api/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await axios.post(`${apiUrl}/api/login`, { email, password });
      const { user: userData, token } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro no login' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await axios.put(`${apiUrl}/api/users/${user.id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro ao atualizar' };
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      await axios.delete(`${apiUrl}/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      logout();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro ao excluir conta' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, deleteUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};