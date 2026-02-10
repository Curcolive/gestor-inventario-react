/**
 * @module api/products
 * Funciones para interactuar con la colección 'products' en Firestore.
 * Cada función maneja errores de forma consistente, registrándolos en consola
 * y relanzándolos para que el componente que las invoque pueda reaccionar.
 */
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const productsCollection = collection(db, "products");

/**
 * Obtiene todos los productos de la colección.
 * @returns {Promise<Array<{id: string}>>} Lista de productos con su ID incluido.
 */
export const getProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Añade un nuevo producto a la colección.
 * @param {Object} productData - Datos del producto a crear.
 * @returns {Promise<string>} ID del documento creado.
 * @throws {Error} Si la escritura en Firestore falla.
 */
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsCollection, productData);
        return docRef.id;
    } catch (error) {
        console.error("Error al añadir el producto:", error);
        throw error;
    }
};

/**
 * Obtiene un producto por su ID.
 * @param {string} id - ID del documento.
 * @returns {Promise<Object|null>} Producto encontrado o null si no existe.
 * @throws {Error} Si la lectura en Firestore falla.
 */
export const getProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }

        console.warn("Producto no encontrado con ID:", id);
        return null;
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
};

/**
 * Actualiza un producto existente.
 * @param {string} id - ID del producto a actualizar.
 * @param {Object} productData - Nuevos datos del producto.
 * @throws {Error} Si la actualización en Firestore falla.
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
 * @param {string} id - ID del producto a eliminar.
 * @throws {Error} Si la eliminación en Firestore falla.
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