// src/pages/dashboard/Profile.jsx
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    } 
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    const updateData = { name: formData.name, username: formData.username, email: formData.email };
    if (formData.password) updateData.password = formData.password;

    const result = await updateUser(updateData);
    if (result.success) {
      alert('Perfil atualizado com sucesso!');
      navigate('/dashboard'); // redireciona após salvar
    } else {
      alert('Erro: ' + result.message);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="display-6 fw-bold">Meu Perfil</h1>
            <p className="text-muted">Gerencie suas informações pessoais</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome de Usuário</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nova Senha (opcional)</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Nova Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      <i className="bi bi-save me-2"></i>Salvar Alterações
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      <i className="bi bi-x-circle me-2"></i>Cancelar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;