import axios from "axios";

export default axios.create({
  baseURL: "https://auth-backend-kp6b.onrender.com",
  withCredentials: true
});
