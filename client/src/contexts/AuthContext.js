import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const stored = localStorage.getItem('user_data');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem('user_data');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const storedAuth = getStoredAuth();

  const [token, setToken] = useState(storedAuth?.userToken || null);
  const [userData, setUserData] = useState(storedAuth?.user || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedAuth);

  const login = (newToken, newData) => {
    localStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData })
    );
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
