import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
let isRefreshing = false;
let queue = [];

function setAuthHeader(config) {
  const token = localStorage.getItem(ACCESS_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(setAuthHeader);

function processQueue(error, token = null) {
  queue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    if (error.response && error.response.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            original._retry = true;
            return api(original);
          })
          .catch((e) => Promise.reject(e));
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const refresh = localStorage.getItem(REFRESH_KEY);
        if (!refresh) throw new Error('No refresh token');
        const { data } = await api.post('/auth/refresh/', { refresh });
        const newAccess = data.access;
        localStorage.setItem(ACCESS_KEY, newAccess);
        isRefreshing = false;
        processQueue(null, newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        isRefreshing = false;
        processQueue(e, null);
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
