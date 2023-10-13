import React, { useState } from 'react';
import { login } from '../api/trackServer';
import { useNavigate, Link } from 'react-router-dom';

function LoginScreen() {
  const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginFormData);

      if (response.status === 200) {
        console.log('Login successful');
        navigate('/main');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-screen">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      value={loginFormData.username}
      onChange={handleInputChange}
    />

    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      value={loginFormData.password}
      onChange={handleInputChange}
    />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/join">Join Trail // Track</Link>
      </p>
    </div>
  );
}

export default LoginScreen;
