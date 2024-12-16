import React, { useState } from 'react';
import icondeal from '../img/logo1.png';
import './Navbar.css';
import { useUserContext } from '../UserContext';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { state, dispatch } = useUserContext();
  const unreadCount = state.unreadCount;

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] }); // Clear notifications
    dispatch({ type: 'UPDATE_UNREAD_COUNT', payload: null }); // Set unreadCount to null
    localStorage.removeItem('userData');
    localStorage.removeItem('notifications');
  };
  

  const renderUnreadBadge = () => {
    if (unreadCount > 0) {
      return (
        <span className="badge bg-danger">{unreadCount}</span>
      );
    }
    return null; 
  };

  return (
    <div className="container-fluid nav-bar bg-transparent">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
          <div className="icon p-2 me-2">
            <img className="img-fluid" src={icondeal} alt="Icon" style={{ width: '50px', height: '50px' }} />
          </div>
          <h1 className="m-0 text-primary">Lantana</h1>
        </Link>
        <button type="button" className="navbar-toggler" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showNav ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" onClick={closeNav}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={closeNav}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/properties" className="nav-link" onClick={closeNav}>
                Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/vehicles" className="nav-link" onClick={closeNav}>
                Vehicles
              </NavLink>
            </li>
            {state.user && !state.user.isAdmin ? (
              <>
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link" onClick={closeNav}>
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/userdashboard" className="nav-link" onClick={closeNav}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
              <NavLink to="/usernotificationlist" className="nav-link" onClick={closeNav}>
                Notifications
                {renderUnreadBadge()} 
              </NavLink>
            </li>
              </>
            ) : null}
            {state.user && state.user.isAdmin ? (
              <>
                <li className="nav-item">
                  <NavLink to="/admindashboard" className="nav-link" onClick={closeNav}>
                    Dashboard
                  </NavLink>
                </li>
                <NavLink to="/notificationlist" className="nav-link" onClick={closeNav}>
                Notifications
                {renderUnreadBadge()} 
              </NavLink>
              </>
            ) : null}
          </ul>
          {state.user ? (
            <div className="d-flex flex-column flex-lg-row gap-2">
              <Link to="/userprofile" className="navbar-text text-dark fw-bold mx-auto">
                {state.user.isAdmin ? 'ADMIN' : state.user.name}
              </Link>
              <Link to="/" className="btn btn-primary px-3 d-lg-flex" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column flex-lg-row gap-2">
              <NavLink to="/login" className="btn btn-primary px-3 d-lg-flex" onClick={closeNav}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary px-3 d-lg-flex" onClick={closeNav}>
                Register
              </NavLink>
            </div>
          )}
        </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
