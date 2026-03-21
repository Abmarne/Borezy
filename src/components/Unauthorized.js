import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <div className="button-group">
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button 
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
