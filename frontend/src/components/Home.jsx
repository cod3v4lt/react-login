import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: <i className="bi bi-shield-check feature-icon"></i>,
      title: 'Segurança',
      description: 'Autenticação segura com JWT e criptografia de senhas'
    },
    {
      icon: <i className="bi bi-gear feature-icon"></i>,
      title: 'Fácil de Usar',
      description: 'Interface intuitiva e responsiva para todos os dispositivos'
    },
    {
      icon: <i className="bi bi-people feature-icon"></i>,
      title: 'Gerenciamento',
      description: 'Controle completo de usuários e permissões'
    },
    {
      icon: <i className="bi bi-graph-up feature-icon"></i>,
      title: 'Performance',
      description: 'Aplicação otimizada com React e PostgreSQL'
    },
    {
      icon: <i className="bi bi-phone feature-icon"></i>,
      title: 'Responsivo',
      description: 'Funciona perfeitamente em desktop, tablet e mobile'
    },
    {
      icon: <i className="bi bi-rocket feature-icon"></i>,
      title: 'Moderno',
      description: 'Tecnologias mais recentes do mercado'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Bem-vindo ao React Auth App
              </h1>
              <p className="lead mb-4">
                Uma aplicação moderna de autenticação construída com React, 
                PostgreSQL e Bootstrap. Gerencie usuários de forma segura e eficiente.
              </p>
              {user ? (
                <div>
                  <div className="alert alert-success d-inline-block mb-4">
                    <i className="bi bi-people me-2"></i>
                    Você está logado como <strong>{user.name}</strong> ({user.email})
                  </div>
                  <div className="mt-4">
                    <h4 className="fw-bold">Bem-vindo de volta!</h4>
                    <p>O que você gostaria de fazer hoje?</p>
                    <div className="d-flex gap-2">
                      <Button variant="primary">
                        <i className="bi bi-person-circle me-2"></i>
                        Meu Perfil
                      </Button>
                      <Button variant="outline-primary">
                        <i className="bi bi-gear me-2"></i>
                        Configurações
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Button as={Link} to="/register" size="lg" className="me-3">
                    <i className="bi bi-people me-2"></i>
                    Começar Agora
                  </Button>
                  <Button as={Link} to="/login" variant="outline-light" size="lg">
                    <i className="bi bi-shield-check me-2"></i>
                    Fazer Login
                  </Button>
                </div>
              )}
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <div className="bg-white rounded-circle p-5 d-inline-block shadow">
                  <i className="bi bi-rocket text-primary" style={{ fontSize: '5rem' }}></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Recursos Principais</h2>
              <p className="lead text-muted">
                Descubra todas as funcionalidades que nossa aplicação oferece
              </p>
            </Col>
          </Row>
          
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    {feature.icon}
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-light py-5">
          <Container>
            <Row className="text-center">
              <Col>
                <h2 className="display-6 fw-bold mb-4">
                  Pronto para começar?
                </h2>
                <p className="lead text-muted mb-4">
                  Crie sua conta gratuita e experimente todas as funcionalidades
                </p>
                <Button as={Link} to="/register" size="lg" className="me-3">
                  <i className="bi bi-person-plus me-2"></i>
                  Criar Conta
                </Button>
                <Button as={Link} to="/login" variant="outline-primary" size="lg">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Já tenho conta
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      
      {/* User Dashboard Section */}
      {user && (
        <section className="py-5 bg-light">
          <Container>
            <Row className="text-center mb-4">
              <Col>
                <h2 className="display-6 fw-bold">Seu Painel</h2>
                <p className="text-muted">Acesse rapidamente suas informações e configurações</p>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <Card.Title>Perfil</Card.Title>
                    <Card.Text>
                      Gerencie suas informações pessoais e preferências
                    </Card.Text>
                    <Button variant="primary" size="sm">Ver Perfil</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-shield-lock-fill" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <Card.Title>Segurança</Card.Title>
                    <Card.Text>
                      Atualize sua senha e configure autenticação de dois fatores
                    </Card.Text>
                    <Button variant="success" size="sm">Segurança</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-gear-fill" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <Card.Title>Configurações</Card.Title>
                    <Card.Text>
                      Personalize sua experiência e configure notificações
                    </Card.Text>
                    <Button variant="info" size="sm">Configurações</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  )
}

export default Home