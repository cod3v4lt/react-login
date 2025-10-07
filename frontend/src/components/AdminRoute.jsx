import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    )
  }

  // Check if user is admin
  if (user && user.role === 'admin') {
    return children
  }
  
  // If user is logged in but not admin, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  
  // If user is not logged in, redirect to login
  return <Navigate to="/login" replace />
}

export default AdminRoute