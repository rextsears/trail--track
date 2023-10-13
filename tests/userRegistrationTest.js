const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server'); // Replace with the correct path to your Express app setup
const User = require('../models/user'); // Import the User model
require('dotenv').config();

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Registration Test', function () {
    before(function (done) {
      // Add a delay to wait for the server to start
      setTimeout(function () {
        // Make sure your server is started before proceeding
        if (app && typeof app.listen === 'function') {
          // Connect to the test database
          const dbUrl = process.env.DATABASE_URL; // Replace with your test database URL
          mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
              console.log("Connected to the database");
              done(); // Continue with tests after the delay
            })
            .catch((err) => {
              done(err);
            });
        } else {
          done(new Error('Server not properly started.'));
        }
      }, 30000); // Adjust the delay time as needed (e.g., 30 seconds)
    });

  it('should register a user successfully', async function () {
    // Test user registration
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'testuser@example.com',
    };

    const res = await chai.request(app)
      .post('/api/join/register')
      .send(userData);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('token');
  });

  it('should not allow duplicate registration', async function () {
    // Attempt to register the same user twice
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      name: 'Test User',
      email: 'testuser@example.com',
    };

    await chai.request(app)
      .post('/api/join/register')
      .send(userData);

    const res = await chai.request(app)
      .post('/api/join/register')
      .send(userData);

    expect(res).to.have.status(400);
    expect(res.body.error).to.equal('Username already taken'); // Corrected expectation
  });
});
