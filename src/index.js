import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

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
            let roleDisplay = member.role === 'leader' ? '<span class="px-2 py-1 bg-primary/10 text-primary-dark text-xs font-bold rounded-lg">리더</span>' :
                member.role === 'new' ? '<span class="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg">새가족</span>' :
                    '<span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg">멤버</span>';

            let nameDisplay = member.name || "이름없음";
            if (member.spouse) {
                nameDisplay += ` & ${member.spouse}`;
            }

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                            ${(member.name || "?").charAt(0)}
                        </div>
                        <span class="font-medium">${nameDisplay}</span>
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
