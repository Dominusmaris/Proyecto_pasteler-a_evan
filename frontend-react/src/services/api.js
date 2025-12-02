import axios from 'axios';

// URL del backend - Usar variable de entorno o fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://pasteleria-backend-dlry.onrender.com/api';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicios de productos
export const productosService = {
  obtenerTodos: () => api.get('/productos'),
  obtenerPorId: (id) => api.get(`/productos/${id}`),
  crear: (producto) => api.post('/productos', producto),
  actualizar: (id, producto) => api.put(`/productos/${id}`, producto),
  eliminar: (id) => api.delete(`/productos/${id}`)
};

// Servicios de autenticación
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (usuario) => api.post('/auth/register', usuario),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default api;