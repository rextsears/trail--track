import React, { useState } from 'react';
import { register } from '../api/trackServer';
import { Link } from 'react-router-dom';

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
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await register(formData);

      if (response.status === 201) {
        console.log('Registration successful');
        // You can redirect to the login screen or perform other actions as needed
        // Example: history.push('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="join-screen">
      <h2>Join - Trail // Track</h2>
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

    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
    />
        <button type="submit">Join</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default JoinScreen;
