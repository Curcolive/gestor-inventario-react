import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

/**
 * Barra de navegación principal de la aplicación.
 * Incluye logo, nombre de marca y enlaces a las secciones principales.
 */
const NavigationBar = () => {
    return (
        <Navbar variant="dark" expand="lg" className="navbar-pro sticky-top">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="navbar-brand-pro d-flex align-items-center">
                    <img
                        src={logo}
                        height="50"
                        className="d-inline-block align-top navbar-logo"
                        alt="Inventario PRO Logo"
                    />
                    <span>Inventario PRO</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* end evita que Inicio quede activo en todas las rutas */}
                        <Nav.Link as={NavLink} to="/" end className="me-3">
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">
                            Productos
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;