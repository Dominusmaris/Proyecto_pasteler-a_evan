import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    const token = authService.getToken();

    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (correo, contraseña) => {
    try {
      const response = await authService.login(correo, contraseña);
      const { token, rol } = response.data;

      const userData = { correo, rol };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('Error de login:', error);
      return { success: false, error: 'Credenciales incorrectas' };
    }
  };

  const register = async (usuario) => {
    try {
      await authService.register(usuario);
      return { success: true };
    } catch (error) {
      console.error('Error de registro:', error);
      return { success: false, error: 'Error al registrar usuario' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.rol === 'ADMIN';
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    isLoggedIn,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};