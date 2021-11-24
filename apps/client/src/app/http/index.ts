import axios from 'axios';
import Constants from '../auth/config/constants';


export const $api = axios.create({
  withCredentials: true,
  baseURL: Constants.server
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (config.headers)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, (async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.post(`${Constants.server}/auth/me`, {}, { withCredentials: true });
      localStorage.setItem('token', response.data.token);
      return $api.request(originalRequest);
    } catch (e) {
      console.error('User is not authorized');
    }
  }
  throw error;
}));

export default $api;

