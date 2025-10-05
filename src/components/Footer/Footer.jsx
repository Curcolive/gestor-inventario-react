import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer-pro text-center">
            <Container>
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Inventario PRO — Proyecto Final de Desarrollo Web de Carlos Abalos
                </p>
            </Container>
        </footer>
    );
};

export default Footer;