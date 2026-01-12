require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

// ✅ CORS: allow frontend origin
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

// ✅ JSON parser
app.use(express.json());

// ✅ Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Welcome to the Auth API'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



