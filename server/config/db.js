const mongoose = require('mongoose');

const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/emberpath';

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected (${mongoUri})`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
