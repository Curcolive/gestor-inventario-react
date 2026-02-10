import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../api/products';
import { formatCurrency } from '../../constants';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner, Form, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

/**
 * Página de catálogo con búsqueda, filtrado por categoría y ordenamiento.
 */
const ProductosPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
                const uniqueCategories = [...new Set(productList.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    /** Productos filtrados y ordenados según los criterios del usuario. */
    const processedProducts = useMemo(() => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        filtered.sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];
            let comparison = 0;

            if (typeof valA === 'string') {
                comparison = valA.localeCompare(valB);
            } else if (typeof valA === 'number') {
                comparison = valA - valB;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

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
            {/* Barra de filtros */}
            <div className="filter-bar mb-4">
                <Row className="g-3 align-items-center">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre..."
                            aria-label="Buscar productos"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            aria-label="Filtrar por categoría"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Todos los tipos</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            aria-label="Ordenar por"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="name">Nombre</option>
                            <option value="price">Precio</option>
                            <option value="stock">Stock</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            aria-label="Dirección de orden"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>

            {/* Lista de productos */}
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {/* Tarjeta para añadir nuevo producto */}
                <Col key="add-product-card">
                    <Card className="card-pro h-100 add-product-card">
                        <Link to="/crear" className="add-product-link">
                            <FaPlus size={50} />
                            <span className="mt-3">Añadir Producto</span>
                        </Link>
                    </Card>
                </Col>

                {processedProducts.map(product => (
                    <Col key={product.id}>
                        <Card className="card-pro h-100">
                            <div className="card-img-container-pro">
                                <Card.Img
                                    variant="top"
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="card-img-pro"
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="card-title-pro">{product.name}</Card.Title>

                                {/* Fila precio + stock con flex-wrap para evitar overflow */}
                                <div className="d-flex align-items-center mb-2 card-price-stock-row">
                                    <p className="card-price-pro m-0 me-3">
                                        {formatCurrency(product.price)}
                                    </p>
                                    <Badge bg={product.stock > 0 ? 'success' : 'danger'}>
                                        {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                                    </Badge>
                                </div>

                                <div className="d-flex justify-content-between mt-auto pt-3">
                                    <Button as={Link} to={`/producto/${product.id}`} className="btn-card-view w-50 me-1">
                                        Ver
                                    </Button>
                                    <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit w-50 ms-1">
                                        Editar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Mensaje cuando no hay resultados */}
            {processedProducts.length === 0 && !loading && (
                <div className="text-center py-5 mt-4">
                    <h3>No se encontraron productos</h3>
                    <p className="text-muted">Intenta con otros filtros o añade un nuevo producto.</p>
                </div>
            )}
        </>
    );
};

export default ProductosPage;