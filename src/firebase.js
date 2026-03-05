import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJyemPt6XlBitF3dpGcluDtDGWmypV-Ec",
  authDomain: "photography-learning.firebaseapp.com",
  projectId: "photography-learning",
  storageBucket: "photography-learning.firebasestorage.app",
  messagingSenderId: "229808174382",
  appId: "1:229808174382:web:6d7c544a941fd1fa3eb6bf",
  measurementId: "G-6JWGVCZ07H",
};

const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);

// DATABASE
export const db = getFirestore(app);

// STORAGE
export const storage = getStorage(app);

// AUTH FUNCTIONS
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const authListener = (cb) => onAuthStateChanged(auth, cb);
