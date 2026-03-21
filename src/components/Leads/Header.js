import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';
import logo1 from '../../assets/screenshot-20240801-at-125204-pmremovebgpreview-1@2x.png';
import profileIcon from '../../assets/Profile.png';
import menuImage from '../../assets/Menu.png';
import './Header.css';

const Header = ({ onMenuClick, isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, logout } = useUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  // List of routes where the header should be hidden
  const hiddenRoutes = ['/login', '/signup', '/profile', '/logout'];
  const shouldHideHeader = hiddenRoutes.includes(location.pathname);

  return (
    <header className={`header1 ${isSidebarOpen ? 'sidebar-open' : ''} ${shouldHideHeader ? 'hidden' : ''}`}>
      <button className="menu-button" onClick={onMenuClick}>
        <img className='menu-image' src={menuImage} alt="Menu" />
      </button>
      <div className="header-logo">
        <img src={logo1} alt="Logo" />
      </div>
      <div className="header-profile-section">
        {userData && (
          <div className="user-info">
            <span className="user-name">{userData.name}</span>
            <span className="user-role">{userData.role}</span>
          </div>
        )}
        <div className="header-actions">
          <img
            src={profileIcon}
            alt="Profile"
            onClick={() => navigate('/profile')}
            title="View Profile"
          />
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
