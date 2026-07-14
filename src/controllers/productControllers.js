// Importo los servicios para los productos
import { 
  createProductService, 
  getAllProductsService,
  getProductByIdService,  
  updateProductService,
  deleteProductService 
} from "../services/products.service.js";

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {

    const products = await getAllProductsService();

    if (products.length === 0) {
      return res.status(404).json({ error: 'No hay productos cargados en el servidor!' });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al cargar la lista de productos, porfavor intente nuevamente' });
  }
};


// Obtener producto por su ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Producto con id: ${id} no encontrado` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al obtener el producto especifico. Intente nuevamente' });
  }
};

//Crear producto nuevo 
const createProduct = async (req, res) => {
  const producto = req.body; 
  if (!producto || !producto.name || !producto.price ) {
    return res.status(400).json({ message: "Error al cargar datos. Verificar de completar los campos correspondientes"});
  }
  try {
    const id = await createProductService(producto);
    producto.id = id;
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al cargar los datso del producto. Porfavor intente nuevamente' });
  }
};

//Actualizar datos de producto
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateProductService(id, data);
    return res.status(200).json({ message: 'Datos actualizados correctamente!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al actualizar los datos del producto, intente nuevamente' });
  }
};

//Eliminar producto por su ID
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteProductService(id);
    return res.status(200).json({ message: 'Producto eliminado con exito!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al eliminar el producto, por favor intente nuevamente' });
  }
};

//Exporto las funciones del controlador
export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}