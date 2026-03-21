import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/Auth/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!token || !userData) {
      navigate('/');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(userData.role)) {
      navigate('/unauthorized');
      return;
    }

  }, [userData, navigate, allowedRoles]);

  if (!userData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
