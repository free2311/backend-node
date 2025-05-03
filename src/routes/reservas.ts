import express from 'express';
import {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
} from '../services/reservasService';
import { tokenValidationMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reservas = await getReservas();
    res.json(reservas);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const { evento_id, nombre_cliente, email_cliente, cantidad } = req.body;
  try {
    const result: any = await createReserva(
      evento_id,
      nombre_cliente,
      email_cliente,
      cantidad
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  try {
    await updateReserva(Number(id), cantidad);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteReserva(Number(id));
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.use(tokenValidationMiddleware);

export default router;
