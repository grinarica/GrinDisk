// src/context/AuthContext.js
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Automatically fetch user data on app load (e.g., from cookie)
  useEffect(() => {
    axios.post(`${apiUrl}/auth/user`, null, { withCredentials: true })
    .then((response) => {
          console.log(response.data)
          setUser(response.data.user)
          setLoading(false)
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  const logout = async () => {
    axios.post(`${apiUrl}/auth/logout`, null, { withCredentials: true })
    .then((response) => {
        console.log(response)
    })
    setUser(null)

  };

  if (loading) return

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
