import express from 'express';
const router = express.Router();
import verificarToken from '../middlewares/auth.middleware.js';

// Importamos el controlador de productos para usar directamente las funciones sin tener que importar una por una
import productController from "../controllers/productControllers.js"

// Mapeamos cada ruta con su función del controlador
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verificarToken, productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', verificarToken, productController.deleteProduct);

export default router;