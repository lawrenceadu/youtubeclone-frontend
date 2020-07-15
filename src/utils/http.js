import axios from "axios";

export const Http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 45000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Http.interceptors.request.use((config) => {
  const url = config?.url?.split("/") || [];

  if (!["login", "forgotten", "signup"].includes(url[1])) {
    config.headers["Authorization"] = `Bearer ${localStorage["access_token"]}`;
  }

  return config;
});

Http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status) {
      if (error.response.status === 401) {
      }

      if (error.response.status === 500) {
      }
    }

    return Promise.reject(error);
  }
);

export default Http;
