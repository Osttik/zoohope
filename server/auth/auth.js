const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('./user')
const auth_router = express.Router();

const secret_key = '5a0497d9ddabf3696935676233889ce3dc4bcfd76370707e83cf05fa91b90f58';
const refresh_secret_key = 'c3f3578ff7b75a99f2ab39e20098d111ddb894629e04c1b2bac1f784e162126d';

const generate_tokens = (user) => {
  const access_token = jwt.sign({ email: user.email, role: user.role }, secret_key, { expiresIn: '1h' });
  const refresh_token = jwt.sign({ email: user.email, role: user.role }, refresh_secret_key, { expiresIn: '7d' });
  return { access_token, refresh_token };
};


const verify_token = (requiredRole) => (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Неавторизовано');
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).send('Нема доступу');
    }
    req.user = decoded;

    if (decoded.role !== requiredRole) {
      return res.status(403).send('Forbidden');
    }

    next();
  });
};

auth_router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Вже існує');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    const tokens = generate_tokens(newUser);
    res.status(201).json({
      message: 'Успішна регістрація',
      tokens: tokens
    });


  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


auth_router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send('Invalid email or password');
  }


  const tokens = generate_tokens(user);
  res.json(tokens);
});


auth_router.post('/verify', (req, res) => {
  const token = req.body.token;


  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).send('Поганий токен');
    }

    res.json(decoded);
  });
});


auth_router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  jwt.verify(refresh_token, refresh_secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid refresh token');
    }

    const tokens = generate_tokens({ email: decoded.email, role: decoded.role });
    res.json(tokens);
  });
});


auth_router.get('/protected', verify_token('admin'), (req, res) => {
  res.send('Protected data');
});

auth_router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

auth_router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send('Успішно видалено');
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка');
  }
});

module.exports = {
  auth_router,
  verify_token
};