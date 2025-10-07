import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const DashboardSidebar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <Nav className="flex-column" variant="pills">
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          to="/dashboard" 
          className={isActive('/dashboard') ? 'active' : ''}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          to="/dashboard/profile" 
          className={isActive('/dashboard/profile') ? 'active' : ''}
        >
          <i className="bi bi-person me-2"></i>
          Meu Perfil
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          to="/dashboard/users"
          className={isActive('/dashboard/users') ? 'active' : ''}
        >
          <i className="bi bi-people me-2"></i>
          Usuários
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          as={Link} 
          to="/dashboard/settings"
          className={isActive('/dashboard/settings') ? 'active' : ''}
        >
          <i className="bi bi-gear me-2"></i>
          Configurações
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default DashboardSidebar