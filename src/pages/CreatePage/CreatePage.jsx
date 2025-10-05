import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Hook para gestionar formularios eficientemente
import { useNavigate } from 'react-router-dom'; // Hook para redirigir al usuario
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { addProduct } from '../../api/products'; // Función de la API para crear productos

/**
 * Página que contiene el formulario para crear un nuevo producto.
 */
const CreatePage = () => {
    // Hook de react-hook-form para registrar campos, manejar el envío y ver errores
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Estado para controlar si el modal de éxito se muestra o no
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Esta función se ejecuta cuando el formulario se envía y es válido
    const onSubmit = async (data) => {
        try {
            // Llama a la función de la API para guardar el nuevo producto en Firebase
            await addProduct(data);
            // Si tiene éxito, muestra el modal de confirmación
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert('Hubo un error al crear el producto. Revisa la consola.');
        }
    };

    // Esta función cierra el modal y redirige al usuario a la página de inicio
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/productos');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Crear Nuevo Producto</h1>
                    {/* El handleSubmit envuelve a nuestra función onSubmit para ejecutarla */}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* --- INICIO DE CAMPOS DEL FORMULARIO --- */}

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: PC Gamer RGB"
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {/* Muestra un mensaje si hay un error de validación en este campo */}
                            {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Logitech, Samsung, HP"
                                {...register("brand", { required: "La marca es obligatoria" })}
                            />
                            {errors.brand && <p className="text-danger small mt-1">{errors.brand.message}</p>}
                        </Form.Group>

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

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                placeholder="Ej: 1500"
                                {...register("price", {
                                    required: "El precio es obligatorio",
                                    valueAsNumber: true,
                                    min: { value: 0.01, message: "El precio debe ser mayor que cero" }
                                })}
                            />
                            {errors.price && <p className="text-danger small mt-1">{errors.price.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ej: 10"
                                {...register("stock", {
                                    required: "El stock es obligatorio",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "El stock no puede ser negativo" }
                                })}
                            />
                            {errors.stock && <p className="text-danger small mt-1">{errors.stock.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register("description", { required: "La descripción es obligatoria" })}
                            />
                            {errors.description && <p className="text-danger small mt-1">{errors.description.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })}
                            />
                            {errors.imageUrl && <p className="text-danger small mt-1">{errors.imageUrl.message}</p>}
                        </Form.Group>
                        
                        <div className="d-grid mt-4">
                            <Button variant="primary" type="submit" className="btn-form-submit">
                                Crear Producto
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>

            {/* Modal que aparece para confirmar que el producto se creó con éxito */}
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