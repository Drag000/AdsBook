import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <Nav className="custom-navigation fixed-top bg-body-tertiary" variant="underline" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link >Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link >Create ad</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link >My ads</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;