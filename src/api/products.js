// Importamos las herramientas de Firestore y nuestra configuración de DB
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

// Esta función se encargará de obtener todos los documentos de la colección 'products'
export const getProducts = async () => {
    // Obtenemos una referencia a la colección 'products'
    const productsCollection = collection(db, "products");

    // getDocs es asíncrono, por lo que esperamos a que obtenga los datos
    const productsSnapshot = await getDocs(productsCollection);

    // Mapeamos el snapshot de los documentos a un array de objetos más manejable
    // Para cada documento, extraemos sus datos con doc.data() y le añadimos el id
    const productList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return productList;
};
export const addProduct = async (productData) => {
    try {
        // Obtenemos una referencia a la colección 'products'
        const productsCollection = collection(db, "products");

        // addDoc es una función de Firestore que añade un nuevo documento con un ID generado automáticamente
        // Esperamos a que la operación se complete y nos devuelve una referencia al nuevo documento
        const docRef = await addDoc(productsCollection, productData);

        // Devolvemos el ID del nuevo documento, lo cual es una buena práctica
        return docRef.id;
    } catch (error) {
        // Si hay un error, lo registramos en la consola y lo relanzamos para que el componente lo maneje
        console.error("Error al añadir el producto:", error);
        throw error;
    }
};
export const getProductById = async (id) => {
    try {
        // Creamos una referencia directa al documento que queremos
        // Necesita la instancia de la db, el nombre de la colección y el id del documento
        const productRef = doc(db, "products", id);

        // Obtenemos el snapshot del documento con getDoc (singular)
        const productSnapshot = await getDoc(productRef);

        // Verificamos si el documento realmente existe
        if (productSnapshot.exists()) {
            // Si existe, devolvemos un objeto con el id y los datos del documento
            return {
                id: productSnapshot.id,
                ...productSnapshot.data()
            };
        } else {
            // Si no se encuentra el documento, lo indicamos
            console.warn("No se encontró el producto con el id:", id);
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        // Creamos una referencia al documento que queremos actualizar
        const productRef = doc(db, "products", id);
        // Usamos la función updateDoc para aplicar los cambios
        await updateDoc(productRef, productData);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        // Creamos una referencia al documento que queremos eliminar
        const productRef = doc(db, "products", id);
        // Usamos la función deleteDoc para borrarlo
        await deleteDoc(productRef);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
};