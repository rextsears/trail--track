import React, { useState } from 'react';
import { register } from '../api/trackServer';

function JoinScreen() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    verifyPassword: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      // Handle password mismatch error
      console.error('Passwords do not match');
      return;
    }

    try {
      // Send registration data to the server
      const response = await register(formData);

      if (response.status === 201) {
        // Handle successful registration
        console.log('Registration successful');
        // Redirect to login screen or perform other actions as needed
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="join-screen">
      <h2>Join Trail // Track</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <label htmlFor="verifyPassword">Verify Password:</label>
        <input
          type="password"
          id="verifyPassword"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleInputChange}
        />

        <label htmlFor="email">E-Mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinScreen;
