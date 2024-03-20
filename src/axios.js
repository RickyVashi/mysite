import axios from 'axios';

const axiosInstance = axios.create();

const token = window.localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Set default Content-Type header to application/json
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
  }
};
