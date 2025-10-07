import { Navbar as BSNavbar, Button, Container, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <i className="bi bi-person me-2"></i>
          React Auth
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/" className="d-flex align-items-center">
                  <i className="bi bi-person me-1"></i>
                  Olá, {user.name}
                </Nav.Link>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="d-flex align-items-center">
                  <i className="bi bi-person-plus me-1"></i>
                  Registrar
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}

export default Navbar
