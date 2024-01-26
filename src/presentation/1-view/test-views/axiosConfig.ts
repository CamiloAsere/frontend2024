import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    // Handle error globally
    return Promise.reject(error);
  }
);