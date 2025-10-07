import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setValidationErrors('')
  }

  const validateForm = () => {
    const errors = {}
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido'
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Senha é obrigatória'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="auth-card shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="bg-primary rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-box-arrow-in-right text-white" style={{ fontSize: '24px' }}></i>
                  </div>
                  <h3 className="fw-bold">Fazer Login</h3>
                  <p className="text-muted">Entre com suas credenciais</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-person me-2"></i>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite seu email"
                      isInvalid={!!validationErrors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-lock me-2"></i>
                      Senha
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        isInvalid={!!validationErrors.password}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.password}
                      </Form.Control.Feedback>
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 10 }}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </Button>
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-primary fw-bold text-decoration-none">
                      Registre-se aqui
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login