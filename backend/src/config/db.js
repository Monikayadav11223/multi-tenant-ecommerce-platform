const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (mongoUri && (mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost'))) {
        console.log("Attempting to connect to local MongoDB...");
        try {
          await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
          console.log(`MongoDB Connected (Local): ${mongoose.connection.host}`);
          return;
        } catch (e) {
          console.log("Local MongoDB not found. Spinning up an IN-MEMORY MongoDB database for development testing...");
          const mongoServer = await MongoMemoryServer.create();
          mongoUri = mongoServer.getUri();
        }
    } else if (!mongoUri) {
        console.log("No MONGO_URI found. Spinning up an IN-MEMORY MongoDB database for development testing...");
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected (In-Memory/Cloud): ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
