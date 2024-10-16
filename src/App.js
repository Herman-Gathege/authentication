import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.access_token);
      setMessage('Logged in successfully');
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  const protectedRoute = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('You are not authorized');
    }
  };

  return (
    <div>
      <h1>Authentication Test</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup}>Sign Up</button>
      <button onClick={login}>Log In</button>
      <button onClick={protectedRoute}>Test Protected Route</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
