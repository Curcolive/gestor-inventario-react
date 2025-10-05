// src/components/Navbar/Navbar.jsx

import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// 1. Importa tu logo SVG desde la carpeta de assets
import logo from '../../assets/logo.svg';

const NavigationBar = () => {
    return (
        <Navbar variant="dark" expand="lg" className="navbar-pro sticky-top">
            <Container>
                {/* 2. El Navbar.Brand ahora es un enlace que contiene tu logo y el texto */}
                <Navbar.Brand as={NavLink} to="/" className="navbar-brand-pro d-flex align-items-center">
                    <img
                        src={logo}
                        height="50"
                        className="d-inline-block align-top navbar-logo"
                        alt="Inventario PRO Logo"
                    />
                    {/* El texto ahora está en un span, al lado del logo */}
                    <span>Inventario PRO</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="me-3">
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