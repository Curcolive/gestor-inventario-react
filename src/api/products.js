// Importaciones de Firestore para interactuar con la base de datos
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// Importación de la instancia de la base de datos configurada
import { db } from '../firebaseConfig';

// Referencia a la colección 'products' en Firestore para reutilizarla
const productsCollection = collection(db, "products");

/**
 * Obtiene todos los productos de la colección 'products'.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos de producto.
 */
export const getProducts = async () => {
    const productsSnapshot = await getDocs(productsCollection);
    // Mapea los documentos obtenidos, añadiendo el ID a los datos de cada producto
    return productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Añade un nuevo producto a la colección.
 * @param {Object} productData - Los datos del producto a crear.
 * @returns {Promise<string>} El ID del nuevo documento creado.
 */
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsCollection, productData);
        return docRef.id;
    } catch (error) {
        console.error("Error al añadir el producto:", error);
        throw error; // Relanza el error para que sea manejado por el componente
    }
};

/**
 * Obtiene un único producto por su ID.
 * @param {string} id - El ID del documento a obtener.
 * @returns {Promise<Object|null>} El objeto del producto o null si no se encuentra.
 */
export const getProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
            return { id: productSnapshot.id, ...productSnapshot.data() };
        } else {
            console.warn("No se encontró el producto con el id:", id);
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
};

/**
 * Actualiza un producto existente por su ID.
 * @param {string} id - El ID del producto a actualizar.
 * @param {Object} productData - Los nuevos datos para el producto.
 */
export const updateProduct = async (id, productData) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, productData);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
};

/**
 * Elimina un producto por su ID.
 * @param {string} id - El ID del producto a eliminar.
 */
export const deleteProduct = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
};