import express from 'express';
const router = express.Router();
import {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} from '../controllers/eventosController';
import { tokenValidationMiddleware } from '../middleware/authMiddleware';

router.use(tokenValidationMiddleware);

router.get('/', getEventos);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;
