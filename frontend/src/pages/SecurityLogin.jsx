// src/pages/SecurityLogin.js

import React, { useState, useContext } from 'react';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const SecurityLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = () => {
    const result = login(username, password);
    if (result.success && result.role === 'security') {
      navigate('/security-dashboard');
      onClose();
    } else {
      setError('Invalid credentials for Security.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center mb-6">Security Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <input
        className="w-full p-3 mb-4 border rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username"
      />
      <input
        className="w-full p-3 mb-4 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
      />
      <button
        className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
        onClick={handleLogin}
      >
        Login
      </button>
    </Modal>
  );
};

export default SecurityLogin;