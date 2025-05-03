import db from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';

export const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results: any) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return resolve(null);

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
          expiresIn: '1h',
        });
        resolve(token);
      }
    );
  });
};

export const registerUser = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users ( password, email) VALUES (?, ?)',
        [hashedPassword, email],
        (err, result: any) => {
          if (err) {
            return reject({
              message: 'Error al registrar el usuario',
              error: err,
            });
          }
          resolve({
            message: 'Usuario registrado exitosamente',
            userId: result.insertId,
          });
        }
      );
    } catch (err) {
      reject({ message: 'Error interno del servidor', error: err });
    }
  });
};

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return resolve(null);
      }
      resolve(decoded);
    });
  });
};
