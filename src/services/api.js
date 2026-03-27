import axios from 'axios';

const api = axios.create({
  // Se existir a variável na Vercel, usa ela. Se não, usa o localhost:8081
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
});

export default api;