import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  // Buscar usuário por email
  static async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error('Erro ao buscar usuário por email:', err);
      throw err;
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, name, username, email, created_at FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error('Erro ao buscar usuário por ID:', err);
      throw err;
    }
  }

  // Criar novo usuário
  static async create(userData) {
    const { name, username, email, password } = userData;
    
    try {
      // Verificar se usuário já existe
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new Error('Usuário já existe');
      }

      // Criptografar senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Inserir usuário
      const result = await pool.query(
        'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email, created_at',
        [name, username, email, hashedPassword]
      );

      return result.rows[0];
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      throw err;
    }
  }

  // Verificar senha
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
      console.error('Erro ao verificar senha:', err);
      throw err;
    }
  }

  // Atualizar usuário
  static async update(id, userData) {
    const { name, username, email } = userData;
    
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, username = $2, email = $3 WHERE id = $4 RETURNING id, name, username, email, created_at',
        [name, username, email, id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      throw err;
    }
  }

  // Deletar usuário
  static async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      throw err;
    }
  }
}

export default User;