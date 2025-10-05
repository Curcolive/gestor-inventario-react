import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../api/products';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner, Form, Badge } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

/**
 * Página que muestra la lista de productos con funcionalidades de búsqueda,
 * filtrado y ordenamiento.
 */
const ProductosPage = () => {
    // --- GESTIÓN DE ESTADO ---
    const [products, setProducts] = useState([]); // Almacena la lista completa de productos
    const [loading, setLoading] = useState(true); // Controla la visualización del spinner de carga
    const [categories, setCategories] = useState([]); // Almacena las categorías únicas para el filtro
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el input de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para el select de categoría
    const [sortBy, setSortBy] = useState('name'); // Criterio de ordenamiento (nombre, precio, etc.)
    const [sortOrder, setSortOrder] = useState('asc'); // Dirección del ordenamiento (ascendente/descendente)

    // --- EFECTO PARA CARGA DE DATOS ---
    // Se ejecuta una sola vez al montar el componente para obtener los productos.
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
                // Extrae categorías únicas de la lista de productos para el filtro
                const uniqueCategories = [...new Set(productList.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false); // Oculta el spinner independientemente del resultado
            }
        };
        loadProducts();
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
    // useMemo optimiza el rendimiento evitando recalcular en cada renderizado.
    // Solo se vuelve a ejecutar si cambian los productos o los criterios de filtro/orden.
    const processedProducts = useMemo(() => {
        let filtered = [...products];

        // Filtrado por término de búsqueda
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filtrado por categoría seleccionada
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Lógica de ordenamiento
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

    // Renderizado condicional mientras se cargan los datos
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
            {/* --- BARRA DE FILTROS --- */}
            <div className="filter-bar mb-4">
                <Row className="g-3 align-items-center">
                    <Col md={6}><Form.Control type="text" placeholder="Buscar por nombre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></Col>
                    <Col md={2}>
                        <Form.Select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                            <option value="">Todos los tipos</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="name">Nombre</option>
                            <option value="price">Precio</option>
                            <option value="stock">Stock</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>

            {/* --- LISTA DE PRODUCTOS --- */}
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {/* Tarjeta estática para añadir un nuevo producto */}
                <Col key="add-product-card">
                    <Card className="card-pro h-100 add-product-card">
                        <Link to="/crear" className="add-product-link">
                            <FaPlus size={50} />
                            <span className="mt-3">Añadir Producto</span>
                        </Link>
                    </Card>
                </Col>

                {/* Mapeo de los productos procesados para renderizar cada tarjeta */}
                {processedProducts.map(product => (
                    <Col key={product.id}>
                        <Card className="card-pro h-100">
                                <div className="card-img-container-pro">
                                    <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="card-img-pro" />
                                </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="card-title-pro">{product.name}</Card.Title>
                                <div className="d-flex align-items-center mb-2">
                                    <p className="card-price-pro m-0 me-3">${new Intl.NumberFormat('es-ES').format(product.price)}</p>
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

            {/* Mensaje por si no se encuentran productos tras aplicar filtros */}
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