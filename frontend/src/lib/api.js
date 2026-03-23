// FILE: frontend/src/lib/api.js
import axios from 'axios';

const api = axios.create({
  // Vite will use the live URL on Vercel, and localhost on your computer
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

export default api;