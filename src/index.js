import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { setupAuthUI } from './authUI.js';
import { requireAuth } from './auth.js';

requireAuth();
setupAuthUI('sidebarAuth');


const memberTableBody = document.querySelector('tbody');

if (memberTableBody) {
    // Listen for real-time updates to the members collection
    const membersRef = collection(db, 'members');
    const q = query(membersRef, orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
        memberTableBody.innerHTML = ''; // Clear existing rows

        if (snapshot.empty) {
            memberTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-slate-500">등록된 멤버가 없습니다.</td></tr>';
            return;
        }

        snapshot.forEach((docSnap) => {
            const member = docSnap.data();
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 dark:hover:bg-slate-700/50';

            // Format roles and family display
            const roleStyles = {
                '순장': 'bg-blue-100 text-blue-700',
                '순모': 'bg-pink-100 text-pink-700',
                '부순장': 'bg-indigo-100 text-indigo-700',
                '부순모': 'bg-rose-100 text-rose-700',
                '순원': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
                '방장': 'bg-purple-100 text-purple-700',
                '방모': 'bg-fuchsia-100 text-fuchsia-700',
                '권찰': 'bg-emerald-100 text-emerald-700',
                'leader': 'bg-primary/10 text-primary-dark',
                'member': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
                'new': 'bg-orange-100 text-orange-600'
            };

            const roleLabels = {
                '순장': '순장',
                '순모': '순모',
                '부순장': '부순장',
                '부순모': '부순모',
                '순원': '순원',
                '방장': '방장',
                '방모': '방모',
                '권찰': '권찰',
                'leader': '리더',
                'member': '멤버',
                'new': '새가족'
            };

            const styleClass = roleStyles[member.role] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
            const label = roleLabels[member.role] || member.role || '멤버';
            let roleDisplay = `<span class="px-2 py-1 ${styleClass} text-xs font-bold rounded-lg">${label}</span>`;

            let nameRaw = member.name || "이름없음";
            let spouseInfo = member.spouse ? ` & ${member.spouse}` : '';
            let childrenInfo = '';

            if (member.children && Array.isArray(member.children) && member.children.length > 0) {
                const childBadges = member.children.map(c => {
                    const genderColor = c.gender === 'female' ? 'text-rose-400' : 'text-blue-400';
                    return `<span class="${genderColor}">${c.name}</span>`;
                }).join(', ');

                childrenInfo = `
                    <div class="flex items-center gap-1 text-[11px] text-slate-400 font-normal mt-0.5">
                        <span class="material-symbols-outlined !text-[14px]">child_care</span>
                        <span>${childBadges}</span>
                    </div>
                `;
            }

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary-dark shrink-0">
                            ${nameRaw.charAt(0)}
                        </div>
                        <div class="flex flex-col justify-center">
                            <div class="flex items-center gap-1">
                                <span class="font-bold text-slate-900">${nameRaw}</span>
                                <span class="text-sm text-slate-500">${spouseInfo}</span>
                            </div>
                            ${childrenInfo}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">${roleDisplay}</td>
                <td class="px-6 py-4 text-sm text-slate-500">${member.phone || '-'}</td>
                <td class="px-6 py-4">
                    <div class="flex gap-1">
                        <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="flex gap-2">
                        <a href="edit_member.html?id=${docSnap.id}" class="text-slate-400 hover:text-primary transition-colors" title="수정">
                            <span class="material-symbols-outlined text-sm">edit</span>
                        </a>
                        <button data-id="${docSnap.id}" class="delete-btn text-slate-400 hover:text-red-500 transition-colors" title="삭제">
                            <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                </td>
            `;
            memberTableBody.appendChild(tr);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm("정말 이 교인 정보를 삭제하시겠습니까? 삭제된 정보는 복구할 수 없습니다.")) {
                    try {
                        await deleteDoc(doc(db, 'members', id));
                        alert("성공적으로 삭제되었습니다.");
                    } catch (error) {
                        console.error("Error removing document: ", error);
                        alert("삭제 중 오류가 발생했습니다.");
                    }
                }
            });
        });

    }, (error) => {
        console.error("Error fetching members: ", error);
        memberTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">멤버 정보를 불러오는데 실패했습니다.</td></tr>';
    });
}

// --- Recent Prayer Requests ---
const recentPrayerList = document.getElementById('recentPrayerList');

if (recentPrayerList) {
    const prayersRef = collection(db, 'prayers');
    const q = query(prayersRef, orderBy('createdAt', 'desc')); // Limit(3)은 snapshot 내부에서 처리하거나 필요시 추가

    onSnapshot(q, (snapshot) => {
        recentPrayerList.innerHTML = '';
        const docs = snapshot.docs.slice(0, 3); // 최신 3개만 표시

        if (docs.length === 0) {
            recentPrayerList.innerHTML = '<div class="p-8 text-center text-slate-400"><p class="text-sm">등록된 기도 제목이 없습니다.</p></div>';
            return;
        }

        docs.forEach(docSnap => {
            const data = docSnap.data();
            const firstChar = (data.author || '익')[0];
            const timeAgo = getTimeAgo(data.createdAt);

            const div = document.createElement('div');
            div.className = 'bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700';
            div.innerHTML = `
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">${firstChar}</div>
                    <span class="font-bold text-sm">${data.author || '익명'}</span>
                    <span class="text-xs text-slate-400">${timeAgo}</span>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    ${data.content || ''}
                </p>
                <div class="mt-3 flex items-center gap-4 text-xs text-slate-400">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">favorite</span> ${data.prayCount || 0}</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">chat_bubble</span> ${data.commentCount || 0}</span>
                </div>
            `;
            recentPrayerList.appendChild(div);
        });
    });
}

function getTimeAgo(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
