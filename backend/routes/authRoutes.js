// routes/authRoutes.js
import { Router } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const user = await User.create({ name, username, email, password });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.message === 'Usuário já existe') {
      return res.status(400).json({ message: err.message });
    }
    console.error('Erro no registro:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || user.status === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas ou conta inativa' });
    }

    const isValid = await User.verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({
      user: { id: user.id, name: user.name, username: user.username, email: user.email, status: user.status },
      token
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/verify', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.status === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado ou inativo' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Token inválido:', err.message);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
});

export default router;