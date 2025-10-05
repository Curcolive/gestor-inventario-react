import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaBoxes } from 'react-icons/fa';
import { getProducts } from '../../api/products';

// Importaciones necesarias de la librería Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

/**
 * Página de inicio que da la bienvenida y muestra un carrusel de productos destacados.
 */
const HomePage = () => {
    // --- Estados del Componente ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Efecto para Cargar Datos ---
    // Se ejecuta una sola vez al montar el componente para obtener los productos del carrusel.
    useEffect(() => {
        const loadProductsForCarousel = async () => {
            try {
                const allProducts = await getProducts();
                setProducts(allProducts.slice(0, 7)); // Tomamos hasta 7 productos.
            } catch (error) {
                console.error("Error al cargar productos para el carrusel:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProductsForCarousel();
    }, []);

    // --- Renderizado del Componente ---
    return (
        <Container>
            {/* --- Sección de Bienvenida (Compacta) --- */}
            <Row className="justify-content-center text-center mt-3">
                <Col md={8}>
                    <FaBoxes size={60} className="mb-3 text-warning" />
                    <h1 className="display-5 fw-bold">
                        Bienvenido a Inventario PRO
                    </h1>
                    <p className="lead text-muted mt-2 mb-3">
                        La solución moderna y eficiente para gestionar el inventario de tu negocio. Controla tu stock, precios y categorías en un solo lugar.
                    </p>
                    <Button as={Link} to="/productos" size="lg" className="btn-cta-pro">
                        Gestionar Inventario
                    </Button>
                </Col>
            </Row>

            {/* --- Sección del Carrusel de Productos --- */}
            <Row className="justify-content-center text-center swiper-section">
                <Col xs={12}>
                    <h2 className="mb-4">Productos Destacados</h2>
                    
                    {/* Renderizado Condicional: Muestra spinner, el carrusel, o un mensaje */}
                    {loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : products.length > 0 ? (
                        <Swiper
                            loop={true}
                            initialSlide={1}
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            coverflowEffect={{
                                rotate: 30,
                                stretch: -20,
                                depth: 200,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={{ clickable: true }}
                            modules={[EffectCoverflow, Pagination, Autoplay]}
                            className="mySwiper"
                        >
                            {/* Mapea los productos para crear cada slide del carrusel */}
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <Link to={`/producto/${product.id}`}>
                                        <img src={product.imageUrl} alt={product.name} />
                                        <div className="slide-caption">
                                            <h3>{product.name}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>No hay productos destacados para mostrar en este momento.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;