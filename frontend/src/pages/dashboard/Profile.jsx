import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const Profile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // In a real application, you would update the user profile here
    console.log('Updating profile:', formData)
    alert('Perfil atualizado com sucesso!')
  }

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
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Deixe em branco para manter a senha atual"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Nova Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Deixe em branco para manter a senha atual"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      <i className="bi bi-save me-2"></i>
                      Salvar Alterações
                    </Button>
                    <Button variant="outline-secondary">
                      <i className="bi bi-x-circle me-2"></i>
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Body className="text-center">
                <div className="mb-3">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                    <i className="bi bi-person-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                </div>
                <h5>{user?.name}</h5>
                <p className="text-muted mb-3">{user?.email}</p>
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-camera me-2"></i>
                  Alterar Foto
                </Button>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Informações da Conta</Card.Title>
                <p><strong>ID:</strong> {user?.id}</p>
                <p><strong>Membro desde:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}</p>
                <p><strong>Último acesso:</strong> Hoje</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile