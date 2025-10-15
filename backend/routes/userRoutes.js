// routes/userRoutes.js
import { Router } from 'express';
import User from '../models/User.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();

router.get('/users', requireAuth, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Atualizar usuário
router.put('/users/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { name, username, email, status } = req.body;

    // Opcional: só permite editar próprio perfil (ou adicionar lógica de admin depois)
    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Acesso negado' });
    }

    try {
        const user = await User.update(id, { name, username, email, status });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ user });
    } catch (err) {
        console.error('Erro ao atualizar:', err);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
});

// Deletar usuário
router.delete('/users/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: 'Acesso negado' });
    }

    try {
        const result = await User.delete(id);
        if (!result) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir:', err);
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
});

export default router;
