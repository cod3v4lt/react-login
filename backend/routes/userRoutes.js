import { Router } from 'express';
import User from '../models/User.js';
import requireAuth from '../middlewares/requireAuth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const limitDefault = parseInt(process.env.PAGINATION_LIMIT) || 10;

// GET /api/users — com paginação
router.get('/users', requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = limitDefault;
    const offset = (page - 1) * limit;

    const totalResult = await User.countAll();
    const totalUsers = parseInt(totalResult[0].count || 0);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.findPaginated(limit, offset);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        perPage: limit
      }
    });
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

// POST /api/users
router.post('/users', requireAuth, async (req, res) => {
    const { name, username, email, password, status = 1 } = req.body;
    try {
        const newUser = await User.create({ name, username, email, password, status });
        res.status(201).json({ user: newUser });
    } catch (err) {
        if (err.message === 'Usuário já existe') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// PUT /api/users/:id
router.put('/users/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await User.update(id, req.body);
        if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar' });
    }
});

// DELETE /api/users/:id
router.delete('/users/:id', requireAuth, async (req, res) => {
    try {
        const result = await User.delete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir' });
    }
});

export default router;
