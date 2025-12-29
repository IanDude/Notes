import axios from "axios";
const BASE_URL = import.meta.env.DEV ? "http://localhost:5001/api" : "/api";
const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === "/login" || currentPath === "/register";
      if (!isAuthPage) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
