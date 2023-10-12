import React, { useState } from 'react';
import { login, register } from '../api/trackServer';
import { useNavigate, Link } from 'react-router-dom';

function LoginScreen() {
  const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });
  const [registerFormData, setRegisterFormData] = useState({ username: '', name: '', password: '', verifyPassword: '', email: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, formDataKey) => {
    const { name, value } = e.target;
    if (formDataKey === 'login') {
      setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setRegisterFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerFormData.password !== registerFormData.verifyPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await register(registerFormData);

      if (response.status === 201) {
        console.log('Registration successful');
        // After successful registration, you might want to automatically log in the user.
        // You can call the handleLogin function here with loginFormData.
        // handleLogin({ preventDefault: () => {} });
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-screen">
      <h2>{isRegistering ? 'Join Trail // Track' : 'Login'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={isRegistering ? registerFormData.username : loginFormData.username}
          onChange={(e) => handleInputChange(e, isRegistering ? 'register' : 'login')}
        />

        {isRegistering && (
          <>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerFormData.name}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={registerFormData.email}
              onChange={(e) => handleInputChange(e, 'register')}
            />
          </>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={isRegistering ? registerFormData.password : loginFormData.password}
          onChange={(e) => handleInputChange(e, isRegistering ? 'register' : 'login')}
        />

        {isRegistering && (
          <>
            <label htmlFor="verifyPassword">Verify Password:</label>
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              value={registerFormData.verifyPassword}
              onChange={(e) => handleInputChange(e, 'register')}
            />
          </>
        )}

        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <Link to="#" onClick={handleRegisterToggle}>
          {isRegistering ? 'Login' : 'Join Trail // Track'}
        </Link>
      </p>
    </div>
  );
}

export default LoginScreen;
