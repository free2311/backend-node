import { authenticateUser, registerUser } from '../services/authService';

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const token = await authenticateUser(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const registerController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);

    if (!user) {
      return res.status(400).json({ message: 'Error al registrar el usuario' });
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).send(err);
  }
};
