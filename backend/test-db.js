import pool from './config/database.js';

async function testDB() {
  try {
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    
    // Test a simple query
    const result = await client.query('SELECT NOW()');
    console.log('✅ Simple query successful:', result.rows[0]);
    
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

testDB();