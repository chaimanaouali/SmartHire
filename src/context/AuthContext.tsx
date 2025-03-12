import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
  setUser: (user: any) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token and validate on mount
    const token = localStorage.getItem('token');
    if (token) {
      validateToken();
    }
  }, []);

  const validateToken = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        setUser({ email: storedEmail });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Starting login for', email);
      const response = await authAPI.login(email, password);
      console.log('AuthContext: Login response:', response);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('userEmail', email);
      
      const userData = { email: email };
      console.log('AuthContext: Setting user data:', userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    setIsAuthenticated(false);
  };

  const loginWithGoogle = () => {
    authAPI.googleLogin();
  };

  const register = async (data: { name: string; email: string; password: string; role: string }) => {
    try {
      const response = await authAPI.register(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      loginWithGoogle,
      register,
      setUser,
      setIsAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 