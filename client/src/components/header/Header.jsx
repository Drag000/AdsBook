import { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { isAuthenticated, userId } = useContext(AuthContext);

  return (
    <Nav className="custom-navigation fixed-top bg-body-tertiary" variant="underline" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>

      {isAuthenticated
        ? (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/ads/create">Create ad</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/ads/myads">My ads</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={`/profile/${userId}/details`}>My Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/logout" >Logout</Nav.Link>
            </Nav.Item>
          </>
        )
        : (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav.Item>
          </>
        )
      }
      <Nav.Item>
      </Nav.Item>
    </Nav>
  );
}

export default Header;