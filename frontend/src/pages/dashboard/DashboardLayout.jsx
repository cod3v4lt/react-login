// src/pages/dashboard/DashboardLayout.jsx
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={3} className="mb-4 mb-lg-0">
          <div className="bg-light p-4 rounded">
            <div className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <h5>{user?.name}</h5>
              <p className="text-muted mb-0">{user?.email}</p>
              <p className="text-muted small">@{user?.username}</p>
            </div>
            <DashboardSidebar />
            <hr className="my-4" />
            <button className="btn btn-outline-danger w-100" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>
        </Col>
        <Col lg={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;