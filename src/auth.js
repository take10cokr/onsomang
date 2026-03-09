import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const provider = new GoogleAuthProvider();

// 구글 로그인
export async function loginWithGoogle() {
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        console.error('로그인 실패:', err);
        if (err.code !== 'auth/cancelled-by-user') {
            alert('로그인 중 오류가 발생했습니다.');
        }
    }
}

// 로그아웃
export async function logout() {
    try {
        await signOut(auth);
    } catch (err) {
        console.error('로그아웃 실패:', err);
    }
}

// 인증 상태 변경 구독
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

// 현재 사용자 반환
export function getCurrentUser() {
    return auth.currentUser;
}

// 로그인 없으면 login 페이지로 리다이렉트
export function requireAuth() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (!user) {
                window.location.href = 'login.html';
            } else {
                resolve(user);
            }
        });
    });
}
