import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <div className="container">
        <LinkContainer to="/">
          <BootstrapNavbar.Brand>
            <i className="bi bi-rocket-takeoff me-2"></i>
            React Auth App
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="bi bi-house me-1"></i>
                Home
              </Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logout} className="text-danger">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sair
                </Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Entrar
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="bi bi-person-plus me-1"></i>
                    Registrar
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </div>
    </BootstrapNavbar>
  )
}

export default Navbar