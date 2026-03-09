import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Firebase 프로젝트 설정 값으로 교체 필요
// 현재는 Firebase Hosting 예약 URL(/__/firebase/init.js)에 의존하고 있었으므로,
// Vite 환경(로컬 개발 서버 포함)에서 작동하려면 명시적인 config가 필요합니다.
// 임시로 환경 변수나 placeholder를 사용합니다.
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
