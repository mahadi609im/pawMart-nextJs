// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVUrhaRCLqcACd8Zo6vbYtoOJYKUIwR_I',
  authDomain: 'pawmart-nextjs.firebaseapp.com',
  projectId: 'pawmart-nextjs',
  storageBucket: 'pawmart-nextjs.firebasestorage.app',
  messagingSenderId: '355774524218',
  appId: '1:355774524218:web:1cd8788d79ef5acbe97e03',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
