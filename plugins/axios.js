// plugins/axios.js

export default function ({ $axios, app }) {
  // Request interceptor
  $axios.onRequest((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}
