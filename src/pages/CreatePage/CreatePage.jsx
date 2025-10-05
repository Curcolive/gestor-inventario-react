import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { addProduct } from '../../api/products';

/**
 * Componente de página que renderiza un formulario para crear un nuevo producto,
 * incluyendo una previsualización de la imagen.
 */
const CreatePage = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    // Se incluye 'watch' para la previsualización de la imagen.
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // 'watch' observa el campo 'imageUrl' y actualiza la variable en tiempo real.
    const imageUrlValue = watch('imageUrl', '');

    // --- Funciones ---
    // Se ejecuta al enviar el formulario para crear el nuevo producto.
    const onSubmit = async (data) => {
        try {
            await addProduct(data);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert('Hubo un error al crear el producto. Revisa la consola.');
        }
    };

    // Cierra el modal de éxito y redirige a la lista de productos.
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/productos');
    };

    // --- Renderizado ---
    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={8} lg={6}>
                    {/* Contenedor principal del formulario para aplicar el borde */}
                    <div className="form-container-pro">
                        <h1 className="text-center mb-4">Crear Nuevo Producto</h1>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            
                            {/* Campo Nombre */}
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control type="text" placeholder="Ej: PC Gamer RGB" {...register("name", { required: "El nombre es obligatorio" })} />
                                {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                            </Form.Group>

                            {/* Campo Marca */}
                            <Form.Group className="mb-3" controlId="brand">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Logitech, Samsung, HP" {...register("brand", { required: "La marca es obligatoria" })} />
                                {errors.brand && <p className="text-danger small mt-1">{errors.brand.message}</p>}
                            </Form.Group>

                            {/* Campo Categoría */}
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Select {...register("category", { required: "La categoría es obligatoria" })}>
                                    <option value="">Selecciona una categoría...</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Videojuegos">Videojuegos</option>
                                    <option value="Hogar">Hogar</option>
                                    <option value="Oficina">Oficina</option>
                                    <option value="Accesorios">Accesorios</option>
                                </Form.Select>
                                {errors.category && <p className="text-danger small mt-1">{errors.category.message}</p>}
                            </Form.Group>

                            {/* Campo Precio */}
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Ej: 1500" {...register("price", { required: "El precio es obligatorio", valueAsNumber: true, min: { value: 0.01, message: "El precio debe ser mayor que cero" } })} />
                                {errors.price && <p className="text-danger small mt-1">{errors.price.message}</p>}
                            </Form.Group>

                            {/* Campo Stock */}
                            <Form.Group className="mb-3" controlId="stock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" placeholder="Ej: 10" {...register("stock", { required: "El stock es obligatorio", valueAsNumber: true, min: { value: 0, message: "El stock no puede ser negativo" } })} />
                                {errors.stock && <p className="text-danger small mt-1">{errors.stock.message}</p>}
                            </Form.Group>

                            {/* Campo Descripción */}
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} {...register("description", { required: "La descripción es obligatoria" })} />
                                {errors.description && <p className="text-danger small mt-1">{errors.description.message}</p>}
                            </Form.Group>

                            {/* Campo URL de Imagen */}
                            <Form.Group className="mb-3" controlId="imageUrl">
                                <Form.Label>URL de la Imagen</Form.Label>
                                <Form.Control type="text" placeholder="https://ejemplo.com/imagen.jpg" {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })} />
                                {errors.imageUrl && <p className="text-danger small mt-1">{errors.imageUrl.message}</p>}
                            </Form.Group>

                            {/* Previsualización de la Imagen */}
                            {imageUrlValue && (
                                <div className="text-center mb-4">
                                    <p className="text-muted mb-2">Previsualización:</p>
                                    <img 
                                        src={imageUrlValue} 
                                        alt="Previsualización del producto" 
                                        className="image-preview"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.onerror = null; }}
                                        onLoad={(e) => { e.target.style.display = 'block'; }}
                                    />
                                </div>
                            )}
                            
                            <div className="d-grid">
                                <Button variant="primary" type="submit" className="btn-form-submit">
                                    Crear Producto
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>

            {/* Modal de confirmación de éxito */}
            <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¡Éxito!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto ha sido creado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CreatePage;