import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_NAME || 'react_auth_db',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT || 5432,
});

// Testar conexão uma vez ao iniciar
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Falha ao conectar ao banco de dados:', err.message);
    process.exit(1); // Pára a aplicação se não houver DB
  } else {
    console.log('✅ Conectado ao PostgreSQL');
  }
});

export default pool;