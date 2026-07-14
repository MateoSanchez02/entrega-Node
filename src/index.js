import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//Importo los archivos de las rutas
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

//Inicializo el servidor con su respectivo puerto local
const app = express();
const PORT = process.env.PORT || 3000;

//Configuro Middlewares Globales
app.use(cors());  // Habilita CORS para que el front no lo rebote
app.use(express.json()); // Permite a la API usar formato JSON en el body
app.use(express.urlencoded({ extended:true }));

//Armo el CRUD. Cada uno tiene su respectiva ruta
app.use('/api/products', productsRoutes);

// Todo lo que entre a /auth se delega a authRoutes
app.use('/api/auth', authRoutes);

// Middleware de body-parser integrado en Express para interpretar cuerpos en formato JSON
app.use(express.json());



// Middleware para manejar los 404
app.use((req, res, next) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        mensaje: `La ruta ${req.originalUrl} con el método ${req.method} no existe en este servidor.`
    });
});

//Iniciar server
app.listen(PORT, () => {
    console.log(`Servidor API corriendo exitosamente en el puerto: ${PORT}`);
});