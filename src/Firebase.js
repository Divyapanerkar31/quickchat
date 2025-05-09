// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Aiw3-HbU89Nl16R0v0h4RwmhPWE5ksg",
  authDomain: "quickchat-d914e.firebaseapp.com",
  projectId: "quickchat-d914e",
  storageBucket: "quickchat-d914e.firebasestorage.app",
  messagingSenderId: "135553866292",
  appId: "1:135553866292:web:1825b8544c83c88e734861",
  measurementId: "G-6L0QQJ7XXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app;