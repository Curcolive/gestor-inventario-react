import { Container } from 'react-bootstrap';

/** Pie de página de la aplicación con créditos del autor. */
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