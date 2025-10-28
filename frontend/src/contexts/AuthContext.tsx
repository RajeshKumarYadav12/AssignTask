'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch current user
      const response: any = await apiClient.get('/auth/me');
      if (response.success && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await apiClient.post('/auth/login', credentials);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;

        // Save tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      const message = error.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await apiClient.post('/auth/register', data);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;

        // Save tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
        toast.success('Registration successful!');
        router.push('/dashboard');
      }
    } catch (error: any) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    // Call logout API
    apiClient.post('/auth/logout').catch(() => {});

    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
