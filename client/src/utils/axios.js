// src/utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

// Add token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
