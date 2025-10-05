import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; // useParams se usa para leer el ID de la URL
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { getProductById, updateProduct } from '../../api/products'; // API para obtener y actualizar

/**
 * Página con un formulario para editar un producto existente.
 */
const EditPage = () => {
    // Obtiene el 'id' del producto de la URL (ej: /editar/id-del-producto)
    const { id } = useParams();
    const navigate = useNavigate();
    
    // El 'reset' se usará para rellenar el formulario con datos existentes
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Estado para controlar la visibilidad del modal de confirmación
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Este efecto se ejecuta cuando el componente carga para buscar los datos del producto
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await getProductById(id);
                if (product) {
                    // Si el producto se encuentra, usa 'reset' para rellenar el formulario
                    reset(product);
                } else {
                    console.error("Producto no encontrado, redirigiendo...");
                    navigate('/productos'); // Si el producto no existe, redirige al inicio
                }
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            }
        };
        loadProduct();
    }, [id, reset, navigate]); // Se ejecuta si alguna de estas dependencias cambia

    // Se ejecuta al enviar el formulario con los datos actualizados
    const onSubmit = async (data) => {
        try {
            await updateProduct(id, data); // Llama a la API para actualizar el producto
            setShowSuccessModal(true); // Muestra el modal de éxito
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert('Hubo un error al actualizar. Revisa la consola.');
        }
    };

    // Cierra el modal de éxito y redirige al usuario a la página de inicio
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/productos');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Editar Producto</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Campo Nombre */}
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                        </Form.Group>

                        {/* Campo Marca */}
                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("brand", { required: "La marca es obligatoria" })}
                            />
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
                            <Form.Control
                                type="number"
                                step="0.01"
                                {...register("price", {
                                    required: "El precio es obligatorio",
                                    valueAsNumber: true,
                                    min: { value: 0.01, message: "El precio debe ser mayor que cero" }
                                })}
                            />
                            {errors.price && <p className="text-danger small mt-1">{errors.price.message}</p>}
                        </Form.Group>

                        {/* Campo Stock */}
                        <Form.Group className="mb-3" controlId="stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("stock", {
                                    required: "El stock es obligatorio",
                                    valueAsNumber: true,
                                    min: { value: 0, message: "El stock no puede ser negativo" }
                                })}
                            />
                            {errors.stock && <p className="text-danger small mt-1">{errors.stock.message}</p>}
                        </Form.Group>

                        {/* Campo Descripción */}
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                {...register("description", { required: "La descripción es obligatoria" })}
                            />
                            {errors.description && <p className="text-danger small mt-1">{errors.description.message}</p>}
                        </Form.Group>

                        {/* Campo URL de Imagen */}
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })}
                            />
                            {errors.imageUrl && <p className="text-danger small mt-1">{errors.imageUrl.message}</p>}
                        </Form.Group>
                        
                        <div className="d-grid mt-4">
                            <Button variant="primary" type="submit" className="btn-form-submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>

            {/* Modal de confirmación de éxito */}
            <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¡Éxito!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El producto ha sido actualizado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EditPage;