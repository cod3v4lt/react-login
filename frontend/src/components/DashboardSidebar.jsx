// src/components/DashboardSidebar.jsx
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === `/dashboard${path}`;

  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/dashboard" className={isActive('') ? 'fw-bold text-primary' : ''}>
        <i className="bi bi-house me-2"></i>Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/dashboard/profile" className={isActive('/profile') ? 'fw-bold text-primary' : ''}>
        <i className="bi bi-person me-2"></i>Meu Perfil
      </Nav.Link>
    </Nav>
  );
};

export default DashboardSidebar;