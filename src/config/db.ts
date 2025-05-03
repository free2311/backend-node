import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eventos_db',
  port: Number(process.env.DB_PORT) || 3307,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión a la base de datos establecida.');
});

export default db;
