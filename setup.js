const mongoose = require('mongoose');
const User = require('./models/user'); // Update with the correct path to your User model
require('dotenv').config();

// Function to create an initial user
async function createInitialUser() {
    const userData = {
        username: 'tomsears',
        password: 'kindonion',
        name: 'Tom Sears',
        email: 'r.tom.sears@gmail.com',
    };

    // Connect to the database
    const dbUrl = process.env.DATABASE_URL; // Replace with your database URL
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    // Save the user to the database
    const user = new User(userData);
    await user.save();

    // Disconnect from the database
    await mongoose.connection.close();
}

// Run the function to create the initial user
createInitialUser();
