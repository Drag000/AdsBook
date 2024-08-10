import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <Nav className="custom-navigation fixed-top bg-body-tertiary" variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/ads/create">Create ad</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/ads">My ads</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {/* <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link> */}
      </Nav.Item>
    </Nav>
  );
}

export default Header;