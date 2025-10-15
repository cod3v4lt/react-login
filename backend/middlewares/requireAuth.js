// middlewares/auth.js
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'Erro interno: JWT_SECRET não configurado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      'SELECT id, name, username, email, status FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    // Verifica se o usuário está ativo (assumindo: status 1 = ativo, 0 = inativo)
    if (user.status === 0) {
      return res.status(401).json({ message: 'Usuário não está ativo' });
    }

    req.user = user;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Falha na autenticação:', err.message);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Falha na autenticação' });
  }
};

export default authenticate;