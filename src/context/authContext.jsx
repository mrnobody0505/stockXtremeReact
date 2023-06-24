import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const login = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password);
   }

   const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
   }

  const logout = () => {
      return signOut(auth);
  }

  const isEmailRegistered = async (email) => {
    try {
      const userCredential = await fetchSignInMethodsForEmail(auth, email);
      return userCredential.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const isAuthenticated = () => {
    console.log(user);
    return user !== null;
  }
  
  return (
    <UserContext.Provider value={{ createUser, user, logout, login, googleLogin, isAuthenticated, isEmailRegistered }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};