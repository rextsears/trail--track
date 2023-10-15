import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/common.css';
import '../styles/login.css';

function LoginScreen() {
  const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = loginFormData;

    try {
      // Make an HTTP POST request to your server's authentication endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

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
      <h1>Trail // Track</h1>
      <h2 id="login-label">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username // </label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginFormData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password // </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginFormData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" class="loginbutton">Login</button>
      </form>

      {/* Add a "Join" link to the registration screen */}
      <p id="join">
        New user? <Link to="/join">Join</Link>
      </p>
    </div>
  );
}

export default LoginScreen;
