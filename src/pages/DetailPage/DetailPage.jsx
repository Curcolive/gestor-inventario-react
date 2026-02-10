import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../api/products';
import { formatCurrency } from '../../constants';
import { Row, Col, Spinner, Button, Badge, Image, Modal } from 'react-bootstrap';

/**
 * Página de detalle de un producto con opciones de editar, eliminar y volver.
 */
const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    const handleDelete = () => setShowConfirmModal(true);

    const confirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteProduct(id);
            setShowConfirmModal(false);
            navigate('/productos');
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            setDeleting(false);
            setShowConfirmModal(false);
        }
    };

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

    return (
        <>
            <div className="page-header-pro">
                <Row className="g-4 g-lg-5">
                    <Col md={6}>
                        <Image src={product.imageUrl} alt={product.name} fluid rounded />
                    </Col>

                    <Col md={6} className="d-flex flex-column">
                        <h1 className="display-5 fw-bold">{product.name}</h1>
                        <div className="d-flex align-items-center my-3 flex-wrap gap-2">
                            <p className="display-6 m-0">
                                {formatCurrency(product.price)}
                            </p>
                            <Badge bg={product.stock > 0 ? 'success' : 'danger'} className="fs-6 py-2 px-3">
                                {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                            </Badge>
                        </div>

                        <div className="flex-grow-1 my-3">
                            <h4 className="border-bottom pb-2 mb-3">Descripción</h4>
                            <p className="fs-5 text-secondary">{product.description}</p>
                        </div>

                        <div className="d-flex gap-2">
                            <Button as={Link} to={`/editar/${product.id}`} className="btn-card-edit flex-grow-1 py-2">
                                Editar
                            </Button>
                            <Button variant="danger" onClick={handleDelete} className="flex-grow-1 py-2">
                                Eliminar
                            </Button>
                            <Button as={Link} to="/productos" variant="secondary" className="flex-grow-1 py-2">
                                Volver
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Modal de confirmación para eliminar */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar <strong>"{product?.name}"</strong>? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={deleting}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetailPage;