import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend URL if not using proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add JWT token for authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
