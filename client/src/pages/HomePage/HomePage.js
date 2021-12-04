import './HomePage.css';

import {Nav,Navbar,NavDropdown, Container} from 'react-bootstrap';
function HomePage() {
    return (
        <div>
            <Navbar bg="info" expand="lg">
  <div className="home">
    <Navbar.Brand href="#home">Food</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
       
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Popular Item</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Special Item</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Regular</NavDropdown.Item>
           </NavDropdown>
           <Nav.Link href="#link">Order</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>
        </div>








    )
}

export default HomePage
