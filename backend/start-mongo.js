const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

async function startMongo() {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  console.log('MongoDB Memory Server is running at:');
  console.log(uri);
  
  // Update .env with this URI
  const envPath = path.join(__dirname, '.env');
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(/^MONGO_URI=.*$/m, `MONGO_URI=${uri}`);
  fs.writeFileSync(envPath, envContent);
  
  console.log('Updated .env with new MONGO_URI.');
  console.log('Keep this process running...');
}

startMongo();
