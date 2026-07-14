
import jwt from 'jsonwebtoken';
import { Router } from 'express';


const router = Router();

//Clave secreta para la autentificacion 
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura_de_mateo';

router.post('/login', (req, res) => {
  
  const { email, password } = req.body;

  // Validacion de datos. Todas las variables necesarias tienen que existir en el .env
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error("ERROR CRÍTICO: Variables de entorno (ADMIN_EMAIL, ADMIN_PASSWORD o JWT_SECRET) no configuradas en .env");
    return res.status(500).json({ 
      success: false,
      message: "Error de configuración interna en el servidor. Falta el archivo .env o sus variables." 
    });
  }

  //Valido identidad por medio de los datos cargados en el .env
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    
    //Generamos token con los datos pasados, con una duracion de 1 hora
    const token = jwt.sign(
      { email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    
    return res.json({ 
      success: true,
      message: "Usuario registrado. Bienvenido al admin de la API.",
      token 
    });
  }

  // Si las credenciales no coinciden devuelve un error 401
  return res.status(401).json({ 
    success: false,
    message: "Credenciales inválidas. Verifique el email y la contraseña." 
  });
});

export default router;