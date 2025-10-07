import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

const DashboardHome = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5003'
        const response = await axios.get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(response.data.users)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="display-6 fw-bold">Dashboard</h1>
            <p className="text-muted">Bem-vindo, {user?.name}!</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Perfil do Usuário</Card.Title>
                <p><strong>Nome:</strong> {user?.name}</p>
                <p><strong>Nome de Usuário:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <Button variant="primary" size="sm">Editar Perfil</Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Estatísticas</Card.Title>
                <Row>
                  <Col md={4} className="mb-3">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-people"></i>
                      </div>
                      <h4>{users.length}</h4>
                      <p className="text-muted mb-0">Total de Usuários</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="text-center">
                      <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-person-check"></i>
                      </div>
                      <h4>0</h4>
                      <p className="text-muted mb-0">Usuários Ativos</p>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="text-center">
                      <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-shield-lock"></i>
                      </div>
                      <h4>0</h4>
                      <p className="text-muted mb-0">Administradores</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Lista de Usuários</Card.Title>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome</th>
                          <th>Nome de Usuário</th>
                          <th>Email</th>
                          <th>Data de Registro</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((userData) => (
                          <tr key={userData.id}>
                            <td>{userData.id}</td>
                            <td>{userData.name}</td>
                            <td>{userData.username}</td>
                            <td>{userData.email}</td>
                            <td>{new Date(userData.created_at).toLocaleDateString('pt-BR')}</td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-1">
                                <i className="bi bi-eye"></i>
                              </Button>
                              <Button variant="outline-warning" size="sm" className="me-1">
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button variant="outline-danger" size="sm">
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
    </div>
  )
}

export default DashboardHome