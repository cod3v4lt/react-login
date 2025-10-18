import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
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

    static async countAll() {
        try {
            const result = await pool.query('SELECT COUNT(*) FROM users');
            return result.rows;
        } catch (err) {
            console.error('Erro ao contar usuários:', err);
            throw err;
        }
    }

    static async findPaginated(limit = 5, offset = 0) {
        try {
            const result = await pool.query(
                `SELECT id, name, username, email, status, created_at
                 FROM users
                 ORDER BY created_at DESC
                 LIMIT $1 OFFSET $2`,
                [limit, offset]
            );
            return result.rows;
        } catch (err) {
            console.error('Erro ao buscar usuários paginados:', err);
            throw err;
        }
    }

    static async findByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0] || null;
        } catch (err) {
            console.error('Erro ao buscar usuário por email:', err);
            throw err;
        }
    }

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

    static async create(userData) {
        const { name, username, email, password, status = 1 } = userData;
        if (!password) throw new Error('Senha é obrigatória');

        const existing = await this.findByEmail(email);
        if (existing) throw new Error('Usuário já existe');

        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, username, email, password, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, username, email, hashed, status]
        );
        return result.rows[0];
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (err) {
            console.error('Erro ao verificar senha:', err);
            throw err;
        }
    }

    static async update(id, userData) {
        const { name, username, email, password, status } = userData;

        try {
            let query = 'UPDATE users SET ';
            const sets = [];
            const values = [];

            if (name !== undefined) {
                sets.push(`name = $${sets.length + 1}`);
                values.push(name);
            }
            if (username !== undefined) {
                sets.push(`username = $${sets.length + 1}`);
                values.push(username);
            }
            if (email !== undefined) {
                sets.push(`email = $${sets.length + 1}`);
                values.push(email);
            }
            if (password !== undefined) {
                const hashed = await bcrypt.hash(password, 10);
                sets.push(`password = $${sets.length + 1}`);
                values.push(hashed);
            }
            if (status !== undefined) {
                sets.push(`status = $${sets.length + 1}`);
                values.push(status);
            }

            sets.push('updated_at = NOW()');
            values.push(id);

            query += sets.join(', ') + ` WHERE id = $${values.length} RETURNING *`;

            const result = await pool.query(query, values);
            return result.rows[0] || null;
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            throw err;
        }
    }

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
