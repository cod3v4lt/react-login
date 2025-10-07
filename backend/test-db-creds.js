import { Pool } from 'pg';

// Test common PostgreSQL credentials
const testCredentials = [
  { user: 'postgres', password: 'postgres' },
  { user: 'postgres', password: 'password' },
  { user: 'postgres', password: '' },
  { user: 'root', password: '' },
];

async function testAllCredentials() {
  console.log('🔍 Testando credenciais comuns do PostgreSQL...\n');
  
  for (const creds of testCredentials) {
    try {
      console.log(`🧪 Testando: usuário="${creds.user}", senha="${creds.password}"`);
      
      const pool = new Pool({
        user: creds.user,
        host: 'localhost',
        database: 'postgres',
        password: creds.password,
        port: 5432,
      });
      
      const client = await pool.connect();
      console.log(`✅ Sucesso com usuário="${creds.user}", senha="${creds.password}"\n`);
      
      // List databases
      const res = await client.query('SELECT datname FROM pg_database WHERE datname NOT LIKE \'template%\' AND datname != \'postgres\';');
      console.log('📂 Bancos de dados existentes:');
      res.rows.forEach(row => console.log(`   - ${row.datname}`));
      
      client.release();
      await pool.end();
      return creds; // Return the working credentials
    } catch (err) {
      console.log(`❌ Falhou: ${err.message}\n`);
    }
  }
  
  console.log('⚠️  Nenhuma das credenciais comuns funcionou.');
  console.log('💡 Você precisa configurar o PostgreSQL com um usuário e senha.');
  return null;
}

testAllCredentials();