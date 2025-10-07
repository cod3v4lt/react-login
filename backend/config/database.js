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

// Test database connection and handle errors gracefully
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
    console.error('🔧 Verifique as configurações de conexão no arquivo .env');
    return false;
  }
};

export default pool;
export { testConnection };