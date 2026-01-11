import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000', // change to your backend URL
  withCredentials: true
});
