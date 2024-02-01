// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-ee59c.firebaseapp.com",
  projectId: "mern-blog-app-ee59c",
  storageBucket: "mern-blog-app-ee59c.appspot.com",
  messagingSenderId: "345160555381",
  appId: "1:345160555381:web:14170f0e2bdb36e33f913c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);