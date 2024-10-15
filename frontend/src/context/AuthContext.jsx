// src/context/AuthContext.js

import React, { createContext, useState } from 'react';
import { users } from '../data/staticData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setAuth({
        isAuthenticated: true,
        user: { id: user.id, username: user.username, role: user.role },
      });
      return { success: true, role: user.role };
    }
    return { success: false };
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
