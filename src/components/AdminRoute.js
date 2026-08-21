import { Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/roles';

function AdminRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoute;