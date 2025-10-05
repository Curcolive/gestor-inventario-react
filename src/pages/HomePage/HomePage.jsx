import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';
import { Link } from 'react-router-dom';
// Asegúrate de que Form.Select esté importado
import { Row, Col, Card, Button, Spinner, Form, Badge, } from 'react-bootstrap';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            {/* --- BARRA DE FILTROS COMPLETA RESTAURADA --- */}
            <div className="filter-bar mb-4">
                <Row className="g-3 align-items-center">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            className="search-input-pro"
                            placeholder="Buscar por nombre de producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select className="filter-select">
                            <option>Todos los tipos</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select className="filter-select">
                            <option>Ordenar por</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select className="filter-select">
                            <option>Asc</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>
            {/* ------------------------------------------- */}

            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {filteredProducts.map(product => (
                    <Col key={product.id}>
                        <Card className="card-pro h-100">
                            <Card.Img src={product.imageUrl} alt={product.name} className="card-img-pro" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="card-title-pro">{product.name}</Card.Title>
                                <div className="d-flex align-items-center mb-2">
                                    <p className="card-price-pro m-0 me-3">
                                        ${new Intl.NumberFormat('de-DE').format(product.price)}
                                    </p>
                                    <Badge bg={product.stock > 0 ? 'success' : 'danger'}>
                                        {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between mt-auto pt-3">
                                    <Button as={Link} to={`/producto/${product.id}`} className="btn-card-view w-50 me-1">Ver</Button>
                                    <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit w-50 ms-1">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-5">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otra búsqueda o añade un nuevo producto.</p>
                </div>
            )}
        </>
    );
};

export default HomePage;