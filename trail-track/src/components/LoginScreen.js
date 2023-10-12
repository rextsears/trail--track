import React, { useState } from 'react';
import { login } from '../api/trackServer';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      if (response.status === 200) {
        // Handle successful login
        console.log('Login successful');
        // You can also store the token in your application for future API requests
        // For example, using localStorage or cookies.
        navigate('/main');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-screen">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginScreen;
