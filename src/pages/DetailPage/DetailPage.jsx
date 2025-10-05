import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../api/products';
import { Row, Col, Spinner, Button, Badge, Image, Modal } from 'react-bootstrap';

/**
 * Componente de página que muestra los detalles completos de un único producto.
 */
const DetailPage = () => {
    // --- Hooks y Estados ---
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // --- Efectos y Funciones ---
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

    const handleDelete = () => {
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(id);
            setShowConfirmModal(false);
            navigate('/productos');
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert('Hubo un error al eliminar el producto.');
        }
    };

    // --- Renderizado Condicional ---
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-5">
                <h2>Producto no encontrado</h2>
                <Button as={Link} to="/productos" variant="primary">Volver a Productos</Button>
            </div>
        );
    }

    // --- Renderizado Principal ---
    return (
        <>
            <div className="page-header-pro">
                <Row className="g-4 g-lg-5">
                    {/* Columna de la Imagen */}
                    <Col md={6}>
                        <Image src={product.imageUrl} alt={product.name} fluid rounded />
                    </Col>

                    {/* Columna de la Información */}
                    <Col md={6} className="d-flex flex-column">
                        <h1 className="display-5 fw-bold">{product.name}</h1>
                        <div className="d-flex align-items-center my-3">
                            <p className="display-6 m-0 me-4">
                                ${new Intl.NumberFormat('es-ES').format(product.price)}
                            </p>
                            <Badge bg={product.stock > 0 ? 'success' : 'danger'} className="fs-6 py-2 px-3">
                                {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                            </Badge>
                        </div>

                        {/* Contenedor para la descripción que ocupa el espacio disponible */}
                        <div className="flex-grow-1 my-3">
                            <h4 className="border-bottom pb-2 mb-3">Descripción</h4>
                            <p className="fs-5 text-secondary">
                                {product.description}
                            </p>
                        </div>
                        
                        {/* Botones de acción, incluyendo el botón "Eliminar" que abre el modal */}
                        <div className="d-flex gap-2">
                            <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit flex-grow-1 py-2">Editar</Button>
                            <Button variant="danger" onClick={handleDelete} className="flex-grow-1 py-2">Eliminar</Button>
                            <Button as={Link} to="/productos" variant="secondary" className="flex-grow-1 py-2">Volver</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Modal completo para confirmar la eliminación */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar <strong>"{product?.name}"</strong>? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    {/* El segundo botón "Eliminar" que ejecuta la acción */}
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetailPage;