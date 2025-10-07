import fs from 'fs';
import path from 'path';
import pool from '../config/database.js';

async function runMigration() {
  try {
    console.log('🚀 Running migration to add username column...');
    
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'migrations', 'add-username-column.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    const client = await pool.connect();
    await client.query(sql);
    client.release();
    
    console.log('✅ Migration completed successfully!');
  } catch (err) {
    console.error('❌ Error running migration:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();