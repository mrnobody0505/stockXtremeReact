// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSD1jGE7BPSu62-KfFb7Ivoaowb_4H3EA",
  authDomain: "stockxtreme-64a07.firebaseapp.com",
  projectId: "stockxtreme-64a07",
  storageBucket: "stockxtreme-64a07.appspot.com",
  messagingSenderId: "1035559916592",
  appId: "1:1035559916592:web:b0adcb71776b21e6b189f5",
  measurementId: "G-V0XGKV3BVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const emailAuthProvider = new EmailAuthProvider();

//Initialize database
const database = getDatabase(app);
export const db = database;
