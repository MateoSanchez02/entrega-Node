import jwt from 'jsonwebtoken';

//Armo la clave secreta de Jason Web Tokens (JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura_de_mateo';

const verificarToken = (req, res, next) => {
    //Extraigo el header de la petición HTTP, particularmente extraigo "Authorization"
    const authHeader = req.headers['authorization'];

    //Verifico si existe o no
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. No se proporcionó el encabezado Authorization.'
        });
    }

    // Separo el formato del token para poder manipularlo y verificar
    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: 'Formato de token inválido. Debe ser: Bearer <TOKEN>'
        });
    }

    //Guardo el token limpio en una constante
    const token = partes[1];

    try {
        //Verifico si el token es valido (no vencio)
        const verificado = jwt.verify(token, JWT_SECRET);

        //Guardo los datos del usuario dentro del request en la variable
        req.user = verificado;

        next();

    } catch (error) {

        return res.status(403).json({
            success: false,
            message: 'Token no valido. Verifique si tiene un token correcto o si se venció.',
            error: error.message
        });
    }
};

//Exporto la función para poder importarla en el archivo de rutas
export default verificarToken;