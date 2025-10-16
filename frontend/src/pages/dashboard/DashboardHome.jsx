// src/pages/dashboard/DashboardHome.jsx
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const { user: currentUser, user: authUser } = useAuth(); // authUser = logado
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Formulários
  const [addForm, setAddForm] = useState({ name: '', username: '', email: '', password: '' });
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '', status: 1 });

  // Buscar usuários
  useEffect(() => {
    if (!authUser) return;
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
        const response = await axios.get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.users);
      } catch (error) {
        alert('Erro ao carregar usuários.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authUser]);

  // Abrir modal de edição
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email,
      status: user.status || 1
    });
    setShowEditModal(true);
  };

  // Salvar edição
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await axios.put(`${apiUrl}/api/users/${editingUser.id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u => u.id === editingUser.id ? response.data.user : u));
      setShowEditModal(false);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  // Adicionar usuário (já funcionando)
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      const response = await axios.post(`${apiUrl}/api/users`, addForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers([...users, response.data.user]);
      setShowAddModal(false);
      setAddForm({ name: '', username: '', email: '', password: '' });
      alert('Usuário criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  // Excluir (já funcionando)
  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Excluir "${name}"?`)) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      await axios.delete(`${apiUrl}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== userId));
      alert('Excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  // Ir para perfil (só se logado)
  const goToProfile = () => {
    if (!authUser) {
      alert('Você precisa estar logado para acessar o perfil.');
      return;
    }
    navigate('/dashboard/profile');
  };

  return (
    <div className="py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-6 fw-bold">Dashboard</h1>
                <p className="text-muted">Bem-vindo, {authUser?.name}!</p>
              </div>
              <Button variant="success" onClick={() => setShowAddModal(true)}>
                <i className="bi bi-plus-circle me-1"></i>Adicionar Usuário
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Meu Perfil</Card.Title>
                <p><strong>Nome:</strong> {authUser?.name}</p>
                <p><strong>Usuário:</strong> @{authUser?.username}</p>
                <p><strong>Email:</strong> {authUser?.email}</p>
                <Button variant="primary" size="sm" onClick={goToProfile}>
                  <i className="bi bi-person me-1"></i>Ver Perfil
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Estatísticas</Card.Title>
                <p>Total de usuários: <strong>{users.length}</strong></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabela */}
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Usuários</Card.Title>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" />
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>Usuário</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>@{u.username}</td>
                            <td>{u.email}</td>
                            <td>
                              {u.status === 1 ? (
                                <span className="badge bg-success">Ativo</span>
                              ) : (
                                <span className="badge bg-danger">Inativo</span>
                              )}
                            </td>
                            <td>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                className="me-1"
                                onClick={() => handleEdit(u)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(u.id, u.name)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal: Editar Usuário */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                required
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control
                required
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Ativo"
                  type="radio"
                  id="status-1"
                  name="status"
                  checked={editForm.status === 1}
                  onChange={() => setEditForm({ ...editForm, status: 1 })}
                />
                <Form.Check
                  inline
                  label="Inativo"
                  type="radio"
                  id="status-0"
                  name="status"
                  checked={editForm.status === 0}
                  onChange={() => setEditForm({ ...editForm, status: 0 })}
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="warning" type="submit">
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal: Adicionar (mantido igual) */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Usuário</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddUser}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                required
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control
                required
                value={addForm.username}
                onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={addForm.email}
                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                required
                value={addForm.password}
                onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Criar Usuário
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardHome;