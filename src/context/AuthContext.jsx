import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, databases, DATABASE_ID, USER_PROFILES_COLLECTION_ID } from '../lib/appwrite';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await account.get();
      setUser(session);
      console.log('User authenticated:', session);
    } catch (error) {
      console.log('No active session:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      await login(email, password);
      
      // Try to create user profile (optional)
      try {
        await databases.createDocument(
          DATABASE_ID,
          USER_PROFILES_COLLECTION_ID,
          ID.unique(),
          {
            userId: newUser.$id,
            displayName: name,
            email: email,
            createdAt: new Date().toISOString()
          }
        );
        console.log('User profile created successfully');
      } catch (dbError) {
        console.warn('Could not create user profile:', dbError.message);
      }
      
      return newUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      setUser(null);
      throw error;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
