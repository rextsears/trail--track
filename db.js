const mongoose = require('mongoose');
require('dotenv').config();

// Create a function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// Export the function to connect to the database
module.exports = connectToDatabase;
