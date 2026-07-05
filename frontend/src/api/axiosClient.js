import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// get client_id from LocalStorage
let clientId = localStorage.getItem('todo_client_id');
if (!clientId) {
  clientId = uuidv4();
  localStorage.setItem('todo_client_id', clientId);
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-client-id': clientId, // Automatically attached to every request.
  },
});

export default axiosClient;