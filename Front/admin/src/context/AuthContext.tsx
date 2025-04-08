import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Logging in with:', { email, password });  // Log request data
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      console.log('Login successful, received token:', token, 'User:', user);  // Log response
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);  // Log response details on error
      }
      throw error;
    }
  };

  const register = async ({ name, email, password, role }: any) => {
    try {
      // Prepare the registration data
      const registerData = {
        name: name, // Ensure the 'name' field is not empty
        email: email, // Check for valid email format
        password: password, // Ensure password meets the server's requirements (e.g., length, characters)
        role: role // Verify that the 'role' field is set properly
      };
  
      // Log the registration data to verify it's correct
      console.log("Register Data: ", registerData);
  
      // Make the API request to register the user
      const response = await axios.post('http://localhost:5001/api/auth/register', registerData);
      
      // Handle successful registration
      console.log("Registration successful:", response.data);
      // Optionally redirect or handle the next steps here
    } catch (err: any) {
      // Log the error to inspect the full response
      console.log("Registration Error: ", err.response);
  
      // Handle errors (e.g., email already exists)
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again later.");
      }
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
function setError(message: any) {
  throw new Error('Function not implemented.');
}

