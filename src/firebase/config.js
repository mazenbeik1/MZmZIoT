// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6QBiiOoo3JMcbFaOFzYJhpKGmwu352QA",
  authDomain: "sample1-824a3.firebaseapp.com",
  projectId: "sample1-824a3",
  storageBucket: "sample1-824a3.appspot.com",
  messagingSenderId: "287196622771",
  appId: "1:287196622771:web:b9389dc1e8bca45f67a5c6",
  measurementId: "G-8KRT0FH0WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
