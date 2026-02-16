const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI is not set');
  process.exit(1);
}

console.log('🔗 Testing MongoDB connection...');
console.log('URI:', uri.substring(0, 50) + '...');

const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const admin = client.db().admin();
    const serverStatus = await admin.serverStatus();
    console.log('📊 Server uptime:', serverStatus.uptime, 'seconds');
    
    const databases = await admin.listDatabases();
    console.log('📁 Available databases:', databases.databases.map(db => db.name).join(', '));
    
    const db = client.db('wdd430');
    const collections = await db.listCollections().toArray();
    console.log('📋 Collections in wdd430:', collections.length > 0 ? collections.map(c => c.name).join(', ') : 'No collections yet');
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    return false;
  } finally {
    await client.close();
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});
