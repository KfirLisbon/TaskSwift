import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'; // Bootstrap components
import { Link } from 'react-router-dom'; // React Router for navigation
import { useAuth0 } from '@auth0/auth0-react'; // Auth0 hook for authentication
import './NavBar.css'; // Custom styles

function NavBar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); // Auth0 hooks

  // Authentication buttons (Log In / Log Out)
  const AuthButtons = () => {
    if (!isAuthenticated) {
      return (
        <button onClick={loginWithRedirect} className="loginbutton">
          Log In
        </button>
      );
    }
    return (
      <>
        <span className="welcome-text">Welcome, {user.name}!</span>
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="loginbutton"
        >
          Log Out
        </button>
      </>
    );
  };

  // Profile picture (conditionally displayed when authenticated)
  const ProfilePicture = () => {
    if (isAuthenticated && user) {
      return (
        <Link to="/profile" className="profile-picture-link">
          <img
            src={user.picture}
            alt="Profile"
            className="navbar-profile-pic"
          />
        </Link>
      );
    }
    return null;
  };

  return (
    <Navbar bg="dark" data-bs-theme="light">
      <Container>
        {/* Brand / Home Link */}
        <Navbar.Brand className="navbrand" as={Link} to="/">
          TaskSwift
        </Navbar.Brand>

        {/* Navigation Links */}
        <Nav className="me-auto">
          <Nav.Link className="components" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link className="components" as={Link} to="/features">
            Features
          </Nav.Link>
          <Nav.Link className="components" as={Link} to="/pricing">
            Pricing
          </Nav.Link>
          <Nav.Link className="components" as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>

        {/* Authentication Section */}
        <div className="auth-buttons">
          <AuthButtons />
        </div>

        {/* Profile Picture */}
        <ProfilePicture />
      </Container>
    </Navbar>
  );
}

export default NavBar;
