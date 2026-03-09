import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDAZK6TJG-959ZC4Z6jrZFZ332eEe65g-o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prayer-portal-antigravity.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prayer-portal-antigravity",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prayer-portal-antigravity.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "976628673239",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:976628673239:web:595d3c670c04cd56f05e92"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
