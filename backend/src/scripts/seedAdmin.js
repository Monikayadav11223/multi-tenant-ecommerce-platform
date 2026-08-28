const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('CRITICAL ERROR: MONGO_URI is not defined in .env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');

    const email = 'admin@gmail.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation to avoid duplicates.');
      if (existingAdmin.role !== 'SuperAdmin') {
        existingAdmin.role = 'SuperAdmin';
        await existingAdmin.save();
        console.log('Updated existing user to SuperAdmin role.');
      }
    } else {
      console.log('Creating SuperAdmin user...');
      const adminUser = new User({
        name: 'Super Admin',
        email: email,
        password: 'password123', // This will be hashed by the pre-save hook in User model
        role: 'SuperAdmin',
        isActive: true
      });
      // The requirement says password: '12345678', wait let me fix it
      adminUser.password = '12345678';
      await adminUser.save();
      console.log('SuperAdmin user created successfully.');
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
