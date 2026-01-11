import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import googleLogo from "../assets/google.png";
import githubLogo from '../assets/github.png';
import './authstyling/AuthPage.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/');
        toast.success("Welcome! to GYANKOSH ✅");
      } else {
        const res = await api.post('/auth/signup', { email, password, name });
        console.log("✅ Signup success:", res.data);
        setMessage(res.data.message || 'Registered successfully!');
        setIsLogin(true);
      }
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      toast.error("Please signup correctly");
      setMessage(err.response?.data?.message || err.message || 'Something went wrong');
    }
  };

  const googleAuth = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  const githubAuth = () => {
    window.location.href = 'http://localhost:8000/auth/github';
  };

  return (
    <div className="auth-page-container">
      <div className="auth-background">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
        <div className="circle c4"></div>

       <motion.div
  className="auth-box"
  initial={{ y: -120, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
transition={{ type: "spring", stiffness: 50, damping: 3 }}
>

          <motion.h1
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6}}
          >
            {isLogin ? 'Login' : 'Signup'}
          </motion.h1>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLogin ? 'Welcome back! Please login.' : 'Signup to begin your journey'}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {!isLogin && (
              <p>
                <label>Your Name</label>
                <motion.input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                />
              </p>
            )}

            <p>
              <label>Email</label>
              <motion.input
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                className='placeholder'
                onChange={(e) => setEmail(e.target.value)}
                required
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </p>

            <p>
              <label>Password</label>
              <motion.input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
            </p>

            <p>
              <motion.input
                type="submit"
                id="sub"
                value={isLogin ? 'Login' : 'Create Account'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </p>
          </motion.form>

         <motion.button
  className="toggle-btn"
  onClick={() => setIsLogin(!isLogin)}
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 200, damping: 10 }}
>
  {isLogin ? (
    <>
      Don't have an account? <span className="highlight">SIGNUP</span>
    </>
  ) : (
    <>
      Already have an account? <span className="highlight">LOGIN</span>
    </>
  )}
</motion.button>
          <hr className="separator" />

          <motion.div
            className="oauth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button onClick={googleAuth} className="oauth-btn" whileHover={{ scale: 1.1 }}>
              <img src={googleLogo} alt="Google" />
            </motion.button>
            <div className="v-line"></div>
            <motion.button onClick={githubAuth} className="oauth-btn" whileHover={{ scale: 1.1 }}>
              <img src={githubLogo} alt="GitHub" />
            </motion.button>
          </motion.div>

          {message && <motion.p className="message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message}</motion.p>}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
