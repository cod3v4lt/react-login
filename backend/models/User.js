// models/User.js
import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  // Buscar todos os usuários
    static async findAll() {
        try {
            const result = await pool.query(
                'SELECT id, name, username, email, status, created_at FROM users ORDER BY created_at DESC'
            );
            return result.rows;
        } catch (err) {
            console.error('Erro ao buscar todos os usuários:', err);
            throw err;
        }
    }
    // Buscar usuário por email
    static async findByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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
                'SELECT id, name, username, email, status, created_at FROM users WHERE id = $1',
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
        const { name, username, email, password, status = 1 } = userData; // status padrão: 1 (ativo)

        if (!password) {
            throw new Error('Senha é obrigatória');
        }

        try {
            const existingUser = await this.findByEmail(email);
            if (existingUser) {
                throw new Error('Usuário já existe');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                'INSERT INTO users (name, username, email, password, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, username, email, status, created_at',
                [name, username, email, hashedPassword, status]
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
        const { name, username, email, status } = userData;

        try {
            const result = await pool.query(
                'UPDATE users SET name = $1, username = $2, email = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING id, name, username, email, status, created_at',
                [name, username, email, status, id]
            );
            return result.rows[0] || null;
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            throw err;
        }
    }

    // Deletar usuário (soft delete opcional, mas aqui é hard delete)
    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
            return result.rows[0] || null;
        } catch (err) {
            console.error('Erro ao deletar usuário:', err);
            throw err;
        }
    }
}

export default User;
