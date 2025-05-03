import {
  getEventos as getEventosService,
  createEvento as createEventoService,
  updateEvento as updateEventoService,
  deleteEvento as deleteEventoService,
} from '../services/eventosService';

export const getEventos = async (req, res) => {
  try {
    const eventos = await getEventosService();
    res.json(eventos);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createEvento = async (req, res) => {
  const { fecha, capacidad } = req.body;
  const userId = req.user.id;
  try {
    const result: any = await createEventoService(userId, fecha, capacidad);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateEvento = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, capacidad } = req.body;
  try {
    await updateEventoService(Number(id), nombre, fecha, capacidad);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEventoService(Number(id));
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};
