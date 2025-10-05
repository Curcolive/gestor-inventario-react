import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../api/products';
// Se ha verificado que todas las importaciones necesarias estén presentes
import { Row, Col, Spinner, Button, Badge, Image } from 'react-bootstrap';

const DetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lógica para cargar el producto (sin cambios)
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    // Lógica para eliminar el producto (sin cambios)
    const handleDelete = async () => {
        if (!product) return;
        const isConfirmed = window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`);
        if (isConfirmed) {
            try {
                await deleteProduct(id);
                navigate('/');
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        }
    };

    // Renderizado condicional para el estado de carga
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    // Renderizado si el producto no se encuentra
    if (!product) {
        return (
            <div className="text-center py-5">
                <h2>Producto no encontrado</h2>
                <Button as={Link} to="/" variant="primary">Volver al Inicio</Button>
            </div>
        );
    }

    // --- RENDERIZADO FINAL Y CORREGIDO DE LA PÁGINA DE DETALLE ---
    return (
        // Usamos nuestro 'page-header-pro' para un estilo consistente
        <div className="page-header-pro">
            <Row className="g-4 g-lg-5"> {/* g-5 para más espacio en pantallas grandes */}
                
                {/* Columna de la Imagen */}
                <Col md={6}>
                    <Image src={product.imageUrl} alt={product.name} fluid rounded />
                </Col>

                {/* Columna de la Información */}
                <Col md={6} className="d-flex flex-column">
                    
                    {/* Título grande y audaz */}
                    <h1 className="display-5 fw-bold">{product.name}</h1>

                    <div className="d-flex align-items-center my-3">
                        <p className="display-6 m-0 me-4">
                            ${new Intl.NumberFormat('de-DE').format(product.price)}
                        </p>
                        <Badge bg={product.stock > 0 ? 'success' : 'danger'} className="fs-6 py-2 px-3">
                            {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                        </Badge>
                    </div>

                    {/* Descripción más grande y legible */}
                    <p className="fs-5 text-secondary">
                        {product.description}
                    </p>

                    {/* Botones empujados al fondo del contenedor */}
                    <div className="mt-auto d-flex gap-2">
                        <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit flex-grow-1 py-2">Editar</Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-grow-1 py-2">Eliminar</Button>
                        <Button as={Link} to="/" variant="secondary" className="flex-grow-1 py-2">Volver</Button>
                    </div>

                </Col>
            </Row>
        </div>
    );
};

export default DetailPage;