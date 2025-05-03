import express from 'express';
import {
  getFact,
  getGif,
  getSearchHistory,
} from '../controllers/factController';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Facts
 *   description: API for managing facts and related resources
 */

/**
 * @swagger
 * /fact:
 *   get:
 *     summary: Retrieve a random fact
 *     tags: [Facts]
 *     responses:
 *       200:
 *         description: A random fact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fact:
 *                   type: string
 *                   description: The random fact
 */

/**
 * @swagger
 * /gif:
 *   get:
 *     summary: Retrieve a random gif
 *     tags: [Facts]
 *     responses:
 *       200:
 *         description: A random gif
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gifUrl:
 *                   type: string
 *                   description: The URL of the random gif
 */

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Retrieve search history
 *     tags: [Facts]
 *     responses:
 *       200:
 *         description: The search history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: A search term from the history
 */

router.get('/fact', getFact);
router.get('/gif', getGif);
router.get('/history', getSearchHistory);

export default router;
