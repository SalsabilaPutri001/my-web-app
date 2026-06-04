import { executeQuery } from './lib/db.js';

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test query ke Sakila database
    const results = await executeQuery('SELECT VERSION() as version');
    console.log('✅ Database connected successfully!');
    console.log('MySQL Version:', results[0].version);
    
    // Cek jumlah data di tabel
    const actorCount = await executeQuery('SELECT COUNT(*) as count FROM actor');
    console.log('📊 Total Actors:', actorCount[0].count);
    
    const filmCount = await executeQuery('SELECT COUNT(*) as count FROM film');
    console.log('📊 Total Films:', filmCount[0].count);
    
    console.log('\n✨ Semuanya berjalan baik! Database siap digunakan.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
