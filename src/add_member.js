import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const saveBtn = document.getElementById('saveMemberBtn');
const addChildBtn = document.getElementById('addChildBtn');
const childrenContainer = document.getElementById('childrenContainer');

// Function to create a child input block
function createChildFields() {
    const childId = Date.now();
    const childDiv = document.createElement('div');
    childDiv.className = 'child-entry bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 relative group';
    childDiv.dataset.id = childId;
    childDiv.innerHTML = `
        <button type="button" class="remove-child absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <span class="material-symbols-outlined text-xs">close</span>
        </button>
        <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
                <p class="text-xs font-semibold text-slate-500">자녀 이름</p>
                <input class="child-name w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 text-sm" placeholder="이름" type="text" />
            </div>
            <div class="space-y-1.5">
                <p class="text-xs font-semibold text-slate-500">생년월일</p>
                <input class="child-birth w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 text-sm" type="date" />
            </div>
        </div>
    `;

    // Add remove event
    childDiv.querySelector('.remove-child').addEventListener('click', () => {
        childDiv.remove();
    });

    return childDiv;
}

// Add child button event
if (addChildBtn) {
    addChildBtn.addEventListener('click', () => {
        childrenContainer.appendChild(createChildFields());
    });

    // Default: show 1 child field on load if container is empty
    if (childrenContainer && childrenContainer.children.length === 0) {
        childrenContainer.appendChild(createChildFields());
    }
}

// save_member 페이지가 아닐 경우 실행 안함
if (saveBtn) {
    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        saveBtn.disabled = true;
        saveBtn.textContent = '저장 중...';

        try {
            // Collect children data
            const children = [];
            const childEntries = document.querySelectorAll('.child-entry');
            childEntries.forEach(entry => {
                const name = entry.querySelector('.child-name').value;
                const birthdate = entry.querySelector('.child-birth').value;
                if (name) {
                    children.push({ name, birthdate });
                }
            });

            const newMember = {
                name: document.getElementById('memberName').value,
                role: document.getElementById('memberRole').value,
                phone: document.getElementById('memberPhone').value,
                birthdate: document.getElementById('memberBirthdate').value,
                spouse: document.getElementById('memberSpouse').value,
                anniversary: document.getElementById('memberAnniversary').value,
                children: children, // Add collected children array
                prayerRequest: document.getElementById('memberPrayerRequest').value,
                notes: document.getElementById('memberNotes').value,
                createdAt: serverTimestamp()
            };

            if (!newMember.name) {
                alert('남편 이름을 입력해주세요.');
                saveBtn.disabled = false;
                saveBtn.textContent = '저장하기';
                return;
            }

            await addDoc(collection(db, 'members'), newMember);
            alert('성공적으로 저장되었습니다.');
            window.location.href = 'index.html';
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('저장 중 오류가 발생했습니다.');
            saveBtn.disabled = false;
            saveBtn.textContent = '저장하기';
        }
    });
}
