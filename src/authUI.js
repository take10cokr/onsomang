/**
 * 공통 사이드바 auth UI 업데이트 모듈
 * 모든 페이지에서 import해서 사용
 */
import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * 사이드바 하단 유저 영역을 로그인 상태에 맞게 업데이트
 * @param {string} containerId - 유저 정보 렌더링할 컨테이너 ID
 * @param {Object} options
 * @param {boolean} options.requireLogin - true면 미로그인시 login.html로 이동
 * @param {function} options.onUser - 로그인된 유저 객체를 받는 콜백
 */
export function setupAuthUI(containerId, options = {}) {
    const container = document.getElementById(containerId);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            if (options.requireLogin) {
                window.location.href = 'login.html';
                return;
            }
            if (container) {
                container.innerHTML = `
                    <button id="sidebarLoginBtn"
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                        <svg class="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.5 22.56 15.67 22.56 12.25z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google 로그인
                    </button>`;
                document.getElementById('sidebarLoginBtn')?.addEventListener('click', () => {
                    signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error);
                });
            }
        } else {
            if (options.onUser) options.onUser(user);
            if (container) {
                const photoHtml = user.photoURL
                    ? `<img src="${user.photoURL}" class="w-10 h-10 rounded-full object-cover" alt="프로필" />`
                    : `<div class="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold">${(user.displayName || '?')[0]}</div>`;
                container.innerHTML = `
                    <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        ${photoHtml}
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold truncate">${user.displayName || '사용자'}</p>
                            <p class="text-xs text-slate-500 truncate">${user.email || ''}</p>
                        </div>
                        <button id="logoutBtn" title="로그아웃"
                            class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                        </button>
                    </div>`;
                document.getElementById('logoutBtn')?.addEventListener('click', async () => {
                    if (confirm('로그아웃 하시겠어요?')) {
                        await signOut(auth);
                        window.location.href = 'login.html';
                    }
                });
            }
        }
    });
}
