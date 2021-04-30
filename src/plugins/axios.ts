import axios from 'axios';

export function setBearerToken(token: string): void {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export function removeBearerToken(): void {
  delete axios.defaults.headers['Authorization'];
}

export { axios };
