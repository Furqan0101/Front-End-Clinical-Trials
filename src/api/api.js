// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://trialx.onrender.com/api/", // ✅ Updated to production backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
