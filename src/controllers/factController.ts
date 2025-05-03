import { Request, Response, NextFunction } from 'express';
import {
  getRandomFact,
  searchGif,
  getHistory,
  saveGifSearch,
} from '../services/factService';

export const getFact = async (req: Request, res: Response) => {
  try {
    const fact = await getRandomFact();
    res.json({ fact });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fact' });
  }
};

export const getGif = async (req: Request, res: Response): Promise<void> => {
  try {
    let fact = req.query.query as string;
    if (!fact) {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }

    // tomar solo las 3 primeras palabras de la consulta

    const words = fact.split(' ').slice(0, 3).join(' ');

    const gifUrl = await searchGif(words);

    const searchDate = new Date();
    await saveGifSearch({
      searchDate,
      fact,
      query: words,
      gifUrl,
    });

    res.json({ fact, query: fact, gifUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching GIF' });
  }
};

export const getSearchHistory = async (req: Request, res: Response) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching history' });
  }
};
