import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal, Spinner } from 'react-bootstrap';
import { getProductById, updateProduct } from '../../api/products';

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productData = await getProductById(id);
                if (productData) {
                    reset(productData);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error al cargar datos para edición:", error);
            }
        };
        loadProduct();
    }, [id, reset, navigate]);

    const onSubmit = (data) => {
        setFormData(data);
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (!formData) return;

        setIsSubmitting(true);
        try {
            await updateProduct(id, formData);
            navigate(`/producto/${id}`);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert('Hubo un error al actualizar el producto.');
        } finally {
            setIsSubmitting(false);
            setShowConfirmModal(false);
        }
    };

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <div className="page-header-pro">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-center mb-4">Editar Producto</h1>

                                {/* --- CAMPOS DEL FORMULARIO RESTAURADOS --- */}

                                {/* Campo Nombre */}
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre del Producto</Form.Label>
                                    <Form.Control type="text" {...register("name", { required: "El nombre es obligatorio" })} className="search-input-pro" />
                                    {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
                                </Form.Group>

                                {/* Campo Precio */}
                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" step="0.01" {...register("price", { required: "El precio es obligatorio", valueAsNumber: true, min: { value: 0.01, message: "El precio debe ser mayor que cero" } })} className="search-input-pro" />
                                    {errors.price && <p className="text-danger mt-1">{errors.price.message}</p>}
                                </Form.Group>

                                {/* Campo Stock */}
                                <Form.Group className="mb-3" controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" {...register("stock", { required: "El stock es obligatorio", valueAsNumber: true, min: { value: 0, message: "El stock no puede ser negativo" } })} className="search-input-pro" />
                                    {errors.stock && <p className="text-danger mt-1">{errors.stock.message}</p>}
                                </Form.Group>

                                {/* Campo Descripción */}
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows={4} {...register("description", { required: "La descripción es obligatoria" })} className="search-input-pro" />
                                    {errors.description && <p className="text-danger mt-1">{errors.description.message}</p>}
                                </Form.Group>

                                {/* Campo URL de Imagen */}
                                <Form.Group className="mb-3" controlId="imageUrl">
                                    <Form.Label>URL de la Imagen</Form.Label>
                                    <Form.Control type="text" {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })} className="search-input-pro" />
                                    {errors.imageUrl && <p className="text-danger mt-1">{errors.imageUrl.message}</p>}
                                </Form.Group>
                                
                                {/* --- FIN DE LOS CAMPOS DEL FORMULARIO --- */}
                                
                                <div className="d-grid mt-4">
                                    <Button variant="primary" type="submit" className="btn-cta-pro py-2">
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* --- EL COMPONENTE MODAL --- */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Guardar Cambios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Deseas guardar los cambios realizados en el producto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate} disabled={isSubmitting} className="btn-cta-pro">
                        {isSubmitting ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {' '}Guardando...
                            </>
                        ) : (
                            'Confirmar'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditPage;