const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error('CRITICAL ERROR: MONGO_URI environment variable is not defined.');
      console.error('Please configure your MongoDB connection string in the .env file.');
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
