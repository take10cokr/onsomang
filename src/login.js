import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const googleLoginBtn = document.getElementById('googleLoginBtn');
const loadingState = document.getElementById('loadingState');

// 이미 로그인되어 있으면 메인으로 이동
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'index.html';
    }
});

googleLoginBtn.addEventListener('click', async () => {
    googleLoginBtn.classList.add('hidden');
    loadingState.classList.remove('hidden');

    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        // onAuthStateChanged가 자동으로 index.html로 이동시킴
    } catch (err) {
        console.error(err);
        googleLoginBtn.classList.remove('hidden');
        loadingState.classList.add('hidden');
        if (err.code !== 'auth/cancelled-by-user' && err.code !== 'auth/popup-closed-by-user') {
            alert('로그인 중 오류가 발생했습니다.\n' + err.message);
        }
    }
});
