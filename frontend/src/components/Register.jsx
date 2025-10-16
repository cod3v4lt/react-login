// src/components/Register.jsx
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // limpar erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003';
      await axios.post(`${apiUrl}/api/register`, {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert('Conta criada com sucesso! Faça login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao registrar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Criar Conta</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nome de Usuário</Form.Label>
                  <Form.Control
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
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
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} className="w-100">
                  {loading ? 'Criando...' : 'Registrar'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                Já tem conta? <Link to="/login">Faça login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;