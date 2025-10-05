import React from 'react';
import { useForm } from 'react-hook-form'; // Importamos el hook principal
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addProduct } from '../../api/products'; // Importamos nuestra función de la API

const CreatePage = () => {
  // Inicializamos useForm, obteniendo las funciones que necesitamos
    const { register, handleSubmit, formState: { errors } } = useForm();
  // Inicializamos useNavigate para poder redirigir
    const navigate = useNavigate();

  // Esta función se ejecutará cuando el formulario se envíe con éxito
    const onSubmit = async (data) => {
    try {
      console.log("Datos a enviar:", data); // Para depuración
        await addProduct(data);
        alert('¡Producto creado con éxito!');
      navigate('/'); // Redirigimos al usuario a la página de inicio
    } catch (error) {
        console.error("Error al crear el producto:", error);
        alert('Hubo un error al crear el producto. Revisa la consola.');
    }
    };

    return (
    <Container className="my-5">
        <Row className="justify-content-md-center">
        <Col md={6}>
            <h1 className="text-center mb-4">Crear Nuevo Producto</h1>
          {/* handleSubmit se encarga de validar el formulario antes de llamar a nuestro onSubmit */}
            <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo Nombre */}
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                type="text"
                placeholder="Ej: PC Gamer RGB"
                {...register("name", { required: "El nombre es obligatorio" })}
                />
              {/* Mostramos el mensaje de error si el campo no es válido */}
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </Form.Group>

            {/* Campo Precio */}
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                type="number"
                step="0.01"
                placeholder="Ej: 1500"
                {...register("price", { 
                    required: "El precio es obligatorio",
                  valueAsNumber: true, // Convierte el valor a número
                    min: { value: 0.01, message: "El precio debe ser mayor que cero" } 
                })}
                />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </Form.Group>

            {/* Campo Stock */}
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
                {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
            </Form.Group>

            {/* Campo Descripción */}
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                {...register("description", { required: "La descripción es obligatoria" })}
                />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </Form.Group>

            {/* Campo URL de Imagen */}
            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                {...register("imageUrl", { required: "La URL de la imagen es obligatoria" })}
                />
                {errors.imageUrl && <p className="text-danger">{errors.imageUrl.message}</p>}
            </Form.Group>
            
            <div className="d-grid">
                <Button variant="primary" type="submit">
                Crear Producto
                </Button>
            </div>
            </Form>
        </Col>
        </Row>
    </Container>
    );
};

export default CreatePage;