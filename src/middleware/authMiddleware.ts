import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('Falta la variable de entorno JWT_SECRET');
}

export const tokenValidationMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó el token' });
  }

  // El formato estándar del header Authorization es: Bearer <token>
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token no encontrado en el encabezado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica y decodifica
    req.user = decoded; // Puedes pasar el usuario a la siguiente función si quieres
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
