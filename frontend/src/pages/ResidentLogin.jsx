import React, { useState } from 'react';
import Modal from '../components/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResidentLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Mock API login request
      // const response = await axios.post('https://your-api.com/login', {
      //   username,
      //   password,
      // });
      navigate('/resident-dashboard');
      // console.log(response.data); // Process login response
      onClose(); // Close modal on successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center mb-6">Resident Login</h2>
      <input
        className="w-full p-3 mb-4 border rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        onClick={handleLogin}
      >
        Login
      </button>
    </Modal>
  );
};

export default ResidentLogin;
