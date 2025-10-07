import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Settings = () => {
  return (
    <div className="py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="display-6 fw-bold">Configurações</h1>
            <p className="text-muted">Gerencie as configurações da sua conta</p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Preferências de Notificação</Card.Title>
                <Form>
                  <Form.Check
                    type="switch"
                    id="email-notifications"
                    label="Receber notificações por email"
                    defaultChecked
                  />
                  <Form.Check
                    type="switch"
                    id="sms-notifications"
                    label="Receber notificações por SMS"
                    className="mt-2"
                  />
                  <Form.Check
                    type="switch"
                    id="push-notifications"
                    label="Receber notificações push"
                    defaultChecked
                    className="mt-2"
                  />
                </Form>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Segurança</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Autenticação de dois fatores</Form.Label>
                    <Form.Select>
                      <option>Desativado</option>
                      <option>Email</option>
                      <option>SMS</option>
                      <option>Aplicativo autenticador</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Button variant="outline-primary" className="me-2">
                    <i className="bi bi-shield-lock me-2"></i>
                    Alterar Senha
                  </Button>
                  <Button variant="outline-secondary">
                    <i className="bi bi-key me-2"></i>
                    Gerenciar Dispositivos
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Conta</Card.Title>
                <p>Depois de excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.</p>
                <Button variant="danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Excluir Conta
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Settings