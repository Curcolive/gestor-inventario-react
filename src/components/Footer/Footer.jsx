import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer-pro mt-5 py-4 text-center">
            <Container>
                © {new Date().getFullYear()} Inventario PRO — Proyecto Final de Desarrollo Web
            </Container>
        </footer>
    );
};
export default Footer;