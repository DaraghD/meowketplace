import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Meowbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
            <img src = "C:\Users\User\Code\Meowketplace\meowketplace\frontend\logo.png" alt = "logo fail"/>
                <Navbar.Brand href="#home">Meowketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Messages
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                 Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">

                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                    <Nav>
                       <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Meowbar;