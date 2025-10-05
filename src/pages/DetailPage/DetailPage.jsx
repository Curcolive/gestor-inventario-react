import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../api/products';
import { Row, Col, Spinner, Button, Image, Modal } from 'react-bootstrap';

/**
 * Componente de página que muestra los detalles completos de un único producto.
 */
const DetailPage = () => {
    // --- Hooks ---
    const { id } = useParams();
    const navigate = useNavigate();
    // useState para almacenar los datos del producto una vez que se obtienen.
    const [product, setProduct] = useState(null);
    // useState para controlar el estado de carga y mostrar un spinner.
    const [loading, setLoading] = useState(true);
    // useState para controlar la visibilidad del modal de confirmación de borrado.
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // --- Efectos ---
    /**
     * useEffect que se ejecuta al cargar el componente para obtener los datos del producto.
     */
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

    // --- Funciones ---
    /**
     * Abre el modal de confirmación antes de eliminar el producto.
     */
    const handleDelete = () => {
        setShowConfirmModal(true);
    };

    /**
     * Ejecuta la eliminación del producto después de la confirmación en el modal.
     */
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
    // Muestra un spinner mientras los datos del producto se están cargando.
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    // Muestra un mensaje si el producto no pudo ser encontrado.
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
            {/* Contenedor principal con los detalles del producto */}
            <div className="page-header-pro">
                <Row className="g-4 g-lg-5">
                    <Col md={6}>
                        <Image src={product.imageUrl} alt={product.name} fluid rounded />
                    </Col>
                    <Col md={6} className="d-flex flex-column">
                        <h1 className="display-5 fw-bold">{product.name}</h1>
                        {/* ... (resto de detalles como precio, stock, descripción) ... */}
                        <div className="mt-auto d-flex gap-2">
                            <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit flex-grow-1 py-2">Editar</Button>
                            <Button variant="danger" onClick={handleDelete} className="flex-grow-1 py-2">Eliminar</Button>
                            <Button as={Link} to="/productos" variant="secondary" className="flex-grow-1 py-2">Volver</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Modal para confirmar la eliminación del producto. */}
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
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetailPage;