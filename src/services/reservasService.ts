import db from '../config/db';

export const getReservas = async () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM reservas', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createReserva = async (
  eventoId: number,
  nombreCliente: string,
  emailCliente: string,
  cantidad: number
) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT capacidad FROM eventos WHERE id = ?',
      [eventoId],
      (err, results: any) => {
        if (err) return reject(err);
        if (results.length === 0)
          return reject(new Error('Evento no encontrado'));

        const capacidad = results[0].capacidad;

        db.query(
          'SELECT SUM(cantidad) AS totalReservas FROM reservas WHERE evento_id = ?',
          [eventoId],
          (err, reservas) => {
            if (err) return reject(err);

            const totalReservas = reservas[0].totalReservas || 0;
            if (totalReservas + cantidad > capacidad) {
              return reject(
                new Error(
                  'No hay suficiente capacidad disponible para este evento'
                )
              );
            }

            db.query(
              'INSERT INTO reservas (evento_id, nombre_cliente, email_cliente, cantidad) VALUES (?, ?, ?, ?)',
              [eventoId, nombreCliente, emailCliente, cantidad],
              (err, results) => {
                if (err) return reject(err);
                resolve(results);
              }
            );
          }
        );
      }
    );
  });
};

export const updateReserva = async (id: number, cantidad: number) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT evento_id FROM reservas WHERE id = ?',
      [id],
      (err, results: any) => {
        if (err) return reject(err);
        if (results.length === 0)
          return reject(new Error('Reserva no encontrada'));

        const eventoId = results[0].evento_id;

        db.query(
          'SELECT capacidad FROM eventos WHERE id = ?',
          [eventoId],
          (err, eventos) => {
            if (err) return reject(err);

            const capacidad = eventos[0].capacidad;

            db.query(
              'SELECT SUM(cantidad) AS totalReservas FROM reservas WHERE evento_id = ? AND id != ?',
              [eventoId, id],
              (err, reservas) => {
                if (err) return reject(err);

                const totalReservas = reservas[0].totalReservas || 0;
                if (totalReservas + cantidad > capacidad) {
                  return reject(
                    new Error(
                      'No hay suficiente capacidad disponible para este evento'
                    )
                  );
                }

                db.query(
                  'UPDATE reservas SET cantidad = ? WHERE id = ?',
                  [cantidad, id],
                  (err) => {
                    if (err) return reject(err);
                    resolve(null);
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

export const deleteReserva = async (id: number) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM reservas WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve(null);
    });
  });
};
