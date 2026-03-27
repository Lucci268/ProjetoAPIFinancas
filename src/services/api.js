import axios from 'axios';

const api = axios.create({
  // Garanta que NÃO tenha localhost fixo aqui
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
});

export default api;