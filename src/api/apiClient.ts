import axios from 'axios';

const apiClient = axios.create({
  baseURL: '베이스 url',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
