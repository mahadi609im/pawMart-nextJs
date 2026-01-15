'use client';
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split('; ');
      const authCookie = cookies.find(row => row.startsWith('auth=true'));
      if (authCookie) {
        return {
          email: 'admin.maha@gmail.com',
          displayName: 'Admin User',
          photoURL: 'https://i.ibb.co.com/kZM1hPc/home3-hero.webp',
        };
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const signOutAuthUser = () => {
    setUser(null);
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return Promise.resolve(true);
  };

  const authInfo = { user, setUser, isLoading, setIsLoading, signOutAuthUser };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
