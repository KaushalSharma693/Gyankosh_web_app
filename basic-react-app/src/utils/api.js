import axios from 'axios';

export default axios.create({
  baseURL: 'https://auth-backend-kp6b.onrender.com', // change to your backend URL
  withCredentials: true
});
