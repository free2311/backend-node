import axios from 'axios';
import db from '../config/db';

import dotenv from 'dotenv';
dotenv.config();

export const getRandomFact = async () => {
  const response = await axios.get('https://catfact.ninja/fact');
  return response.data.fact;
};

export const searchGif = async (query: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API key is not defined in environment variables');
  }
  const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: apiKey,
      q: query,
      limit: 1,
    },
  });

  const gifUrl = response.data.data[0]?.images?.original?.url || '';
  return gifUrl;
};

export const getHistory = () => {
  const sql = 'SELECT * FROM gif_searches ORDER BY search_date DESC';
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const saveGifSearch = async ({
  searchDate,
  fact,
  query,
  gifUrl,
}: {
  searchDate: Date;
  fact: string;
  query: string;
  gifUrl: string;
}) => {
  const sql = `INSERT INTO gif_searches (search_date, fact, query, gif_url) VALUES (?, ?, ?, ?)`;
  const values = [searchDate, fact, query, gifUrl];

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
