const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Local Signup
router.post('/signup', async (req, res) => {
    console.log('🔥 Incoming body:', req.body); 
  const { email, password, name } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User exists' });

    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashed, name });
   res.status(200).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'User already exists' });
  }

});

// ✅ Local Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  })(req, res, next);
});

// 1. Start Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Redirect to React HomePage with token
    res.redirect(`http://localhost:5173/home?token=${token}`);
  }
);

// 3. Start GitHub OAuth
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// 4. GitHub OAuth callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Redirect to React HomePage with token
    res.redirect(`http://localhost:5173/home?token=${token}`);
  }
);

// Optional failure route
router.get('/failed', (req, res) => {
  res.send('OAuth failed');
});


module.exports = router;
