import db from '../config/db';

export const getEventos = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM eventos', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createEvento = async (
  idUser: number,
  fecha: string,
  capacidad: number
) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO eventos (user_id, fecha, capacidad) VALUES (?, ?, ?)',
      [idUser, fecha, capacidad],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const updateEvento = async (
  id: number,
  nombre: string,
  fecha: string,
  capacidad: number
) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE eventos SET nombre = ?, fecha = ?, capacidad = ? WHERE id = ?',
      [nombre, fecha, capacidad, id],
      (err) => {
        if (err) return reject(err);
        resolve(null);
      }
    );
  });
};

export const deleteEvento = async (id: number) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM eventos WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve(null);
    });
  });
};
