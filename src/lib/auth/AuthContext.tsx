'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  registerWithEmail: (data: {
    fullName: string;
    email: string;
    password: string;
    whatsappNumber: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  switchUserRoleForTesting: (role: UserRole) => void;
  migrateDemoToUser: (newUserId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'invitatum_active_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if saved user in localStorage
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserToStateAndStorage = (userData: UserProfile | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  };

  const loginWithGoogle = async () => {
    // In dev / sandbox or before Google OAuth client ID is set, provide seamless mock Google auth
    const googleUser: UserProfile = {
      id: `google-${Date.now()}`,
      email: 'user.google@gmail.com',
      displayName: 'Pengguna Google',
      whatsappNumber: '+6281200001111',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveUserToStateAndStorage(googleUser);
    migrateDemoToUser(googleUser.id);
  };

  const loginWithEmail = async (email: string, _password: string): Promise<boolean> => {
    const isSuperAdmin = email.toLowerCase().includes('admin');
    const loggedUser: UserProfile = {
      id: isSuperAdmin ? 'admin-super-01' : `user-${Date.now()}`,
      email: email.toLowerCase(),
      displayName: isSuperAdmin ? 'Super Admin Invitatum' : email.split('@')[0],
      whatsappNumber: '+6281234567890',
      role: isSuperAdmin ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveUserToStateAndStorage(loggedUser);
    migrateDemoToUser(loggedUser.id);
    return true;
  };

  const registerWithEmail = async (data: {
    fullName: string;
    email: string;
    password: string;
    whatsappNumber: string;
  }): Promise<boolean> => {
    const isSuperAdmin = data.email.toLowerCase().includes('admin');
    const newUser: UserProfile = {
      id: isSuperAdmin ? 'admin-super-01' : `user-${Date.now()}`,
      email: data.email.toLowerCase(),
      displayName: data.fullName,
      whatsappNumber: data.whatsappNumber,
      role: isSuperAdmin ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveUserToStateAndStorage(newUser);
    migrateDemoToUser(newUser.id);
    return true;
  };

  const logout = async () => {
    saveUserToStateAndStorage(null);
  };

  const switchUserRoleForTesting = (role: UserRole) => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'admin-super-01',
        email: 'admin@invitatum.com',
        displayName: 'Super Admin Invitatum',
        whatsappNumber: '+6281234567890',
        role: 'admin',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: new Date().toISOString(),
      };
      saveUserToStateAndStorage(adminUser);
    } else {
      const demoUser: UserProfile = {
        id: 'user-demo',
        email: 'demo@invitatum.com',
        displayName: 'Alya & Budi',
        whatsappNumber: '+6281298765432',
        role: 'user',
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: new Date().toISOString(),
      };
      saveUserToStateAndStorage(demoUser);
    }
  };

  const migrateDemoToUser = (newUserId: string) => {
    try {
      const pendingDemo = localStorage.getItem('invitatum_pending_demo_invitation');
      if (pendingDemo) {
        const demoData = JSON.parse(pendingDemo);
        demoData.userId = newUserId;
        demoData.status = 'draft';
        demoData.id = `inv-${Date.now()}`;
        // Store migrated invitation
        localStorage.setItem(`invitatum_user_invitation_${demoData.id}`, JSON.stringify(demoData));
        localStorage.removeItem('invitatum_pending_demo_invitation');
      }
    } catch {
      // Ignore migration errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === 'admin',
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        switchUserRoleForTesting,
        migrateDemoToUser,
      }}
    >
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
