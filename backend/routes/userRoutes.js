// routes/userRoutes.js
import { Router } from 'express';
import User from '../models/User.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();

// GET /api/users
router.get('/users', requireAuth, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

// POST /api/users — ✅ NOVO
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
