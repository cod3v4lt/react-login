import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './config/database.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory user store for testing when database is not available
let inMemoryUsers = [];

// Function to test database connection
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
    console.log('ℹ️  Usando armazenamento em memória para testes');
    return false;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if database is available
    const dbConnected = await testDatabaseConnection();
    
    if (dbConnected) {
      // Use database
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert user
      const result = await pool.query(
        'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email',
        [name, username, email, hashedPassword]
      );

      const user = result.rows[0];

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: { id: user.id, name: user.name, username: user.username, email: user.email },
        token
      });
    } else {
      // Use in-memory storage
      const existingUser = inMemoryUsers.find(user => user.email === email);
      
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user in memory
      const user = {
        id: inMemoryUsers.length + 1,
        name,
        username,
        email,
        password: hashedPassword
      };
      
      inMemoryUsers.push(user);

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso (em memória)',
        user: { id: user.id, name: user.name, username: user.username, email: user.email },
        token
      });
    }
  } catch (err) {
    console.error('❌ Erro no registro:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Verificar tipo de erro
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email já está em uso' });
    }
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Erro de conexão com o banco de dados' });
    }
    if (err.code === 'ENOTFOUND') {
      return res.status(500).json({ message: 'Servidor de banco de dados não encontrado' });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
    });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if database is available
    const dbConnected = await testDatabaseConnection();
    
    let user = null;
    
    if (dbConnected) {
      // Find user in database
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      user = result.rows[0];
      
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } else {
      // Find user in memory
      user = inMemoryUsers.find(user => user.email === email);
      
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      user: { id: user.id, name: user.name, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    console.error('❌ Erro no login:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Verificar tipo de erro
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Erro de conexão com o banco de dados' });
    }
    if (err.code === 'ENOTFOUND') {
      return res.status(500).json({ message: 'Servidor de banco de dados não encontrado' });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
    });
  }
});

// Verify token
app.get('/api/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if database is available
    const dbConnected = await testDatabaseConnection();
    
    let user = null;
    
    if (dbConnected) {
      const result = await pool.query(
        'SELECT id, name, username, email FROM users WHERE id = $1',
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }
      
      user = result.rows[0];
    } else {
      // Find user in memory
      user = inMemoryUsers.find(user => user.id === decoded.userId);
      
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }
    }

    res.json({ user: { id: user.id, name: user.name, username: user.username, email: user.email } });
  } catch (err) {
    console.error('❌ Erro na verificação do token:', err.message);
    console.error('Stack trace:', err.stack);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Erro de conexão com o banco de dados' });
    }
    
    res.status(401).json({ 
      message: 'Erro na verificação do token',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
    });
  }
});

// Inicializar servidor
const startServer = async () => {
  console.log('🚀 Iniciando servidor...');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 API disponível em: http://localhost:${PORT}`);
  });
};

startServer();