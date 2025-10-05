import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        // 'variant="dark"' es la clave para que el texto y el botón del menú móvil sean claros
        <Navbar variant="dark" expand="lg" className="navbar-pro sticky-top">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="navbar-brand-pro">
                    Inventario PRO
                </Navbar.Brand>
                <Button as={NavLink} to="/crear" className="btn-cta-pro">
                    + Añadir Producto
                </Button>
            </Container>
        </Navbar>
    );
};
export default NavigationBar;