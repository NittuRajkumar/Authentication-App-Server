import React, { createContext,  useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// const getStoredAuth = () => {
//   const stored = localStorage.getItem('user_data');
//   if (!stored) return null;

//   try {
//     return JSON.parse(stored);
//   } catch {
//     localStorage.removeItem('user_data');
//     return null;
//   }
// };

export const AuthProvider = ({ children }) => {
  // const storedAuth = getStoredAuth();

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storedData  = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    if (storedData){
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

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
      value={(token,
        userData,
        isAuthenticated,
        login,
        logout
  )}
    >
      {children}
    </AuthContext.Provider>
  );

};


export const  useAuth = () => useContext(AuthContext);
