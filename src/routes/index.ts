import express from 'express';
import authRoutes from './auth';
import eventosRoutes from './eventos';
import factRoutes from './fact';
import reservasRoutes from './reservas';

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/eventos', eventosRoutes);
router.use('/api', factRoutes);
// router.use('/reservas', reservasRoutes);

export default router;
