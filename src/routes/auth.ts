import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', loginController);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/register', registerController);

export default router;
