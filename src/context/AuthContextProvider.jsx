'use client';
import { createContext, useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';

const AuthContext = createContext('');

const provider = new GoogleAuthProvider();

const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registerAuthCreate = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setIsLoading(false)
    );
  };

  const signInAuthUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setIsLoading(false)
    );
  };

  const updateUserProfile = userUpdateInfo => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, userUpdateInfo).finally(() =>
      setIsLoading(false)
    );
  };

  const googleLogin = () => {
    setIsLoading(true);
    return signInWithPopup(auth, provider).finally(() => setIsLoading(false));
  };

  const signOutAuthUser = () => {
    setIsLoading(true);
    return signOut(auth).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    registerAuthCreate,
    signInAuthUser,
    user,
    setUser,
    updateUserProfile,
    signOutAuthUser,
    googleLogin,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
export { AuthContext };
