import { readDocuments, readDocument, createDocument, updateDocument, deleteDocument } from "../models/firebase.models.js";

//Armo la estructura del product. Extraigo los valores en base a lo que se pase o no a la hora de mandarlo en el POST
const formatProductStructure = (product) => {
  if (!product) return null;
  
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock,
    description: product.description || "" // Si no tiene descripción, evita que quede undefined
  };
};

//Traer todos los productos ordenados
export const getAllProductsService = async () => {
  const products = await readDocuments("products");
  // Mapeamos todos los productos de la lista para ordenarlos visualmente
  return products.map(product => formatProductStructure(product));
};

//Obtener producto ordenados por su ID
export const getProductByIdService = async (id) => {
  const product = await readDocument("products", id);
  return formatProductStructure(product);
};

//Estos servicios devuelven directamente el ID / cargan los datos de manera directa
export const createProductService = async (producto) => await createDocument("products", producto);
export const updateProductService = async (id, data) => await updateDocument("products", id, data);
export const deleteProductService = async (id) => await deleteDocument("products", id);