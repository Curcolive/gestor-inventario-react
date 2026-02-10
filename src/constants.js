/**
 * Constantes compartidas de la aplicación.
 * Centraliza valores reutilizados en múltiples componentes para evitar duplicación.
 */

/** Categorías disponibles para productos. */
export const PRODUCT_CATEGORIES = [
    'Tecnología',
    'Videojuegos',
    'Hogar',
    'Oficina',
    'Accesorios',
];

/** Formateador de moneda reutilizable (formato argentino). */
export const formatCurrency = (value) =>
    `$${new Intl.NumberFormat('es-AR').format(value)}`;

/** Cantidad máxima de productos en el carrusel del home. */
export const MAX_CAROUSEL_PRODUCTS = 7;
