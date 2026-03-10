import { db } from './firebase.js';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const saveBtn = document.getElementById('saveMemberBtn');
const addChildBtn = document.getElementById('addChildBtn');
const childrenContainer = document.getElementById('childrenContainer');

// Function to create a child input block
function createChildFields(name = '', gender = 'male', birthdate = '') {
    const childId = Date.now() + Math.random();
    const childDiv = document.createElement('div');
    childDiv.className = 'child-entry bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 relative group';
    childDiv.dataset.id = childId;
    childDiv.innerHTML = `
        <button type="button" class="remove-child absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <span class="material-symbols-outlined text-xs">close</span>
        </button>
        <div class="grid grid-cols-3 gap-4">
            <div class="space-y-1.5 col-span-1">
                <p class="text-xs font-semibold text-slate-500">자녀 이름</p>
                <input class="child-name w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 text-sm" placeholder="이름" type="text" value="${name}" />
            </div>
            <div class="space-y-1.5 col-span-1">
                <p class="text-xs font-semibold text-slate-500">성별</p>
                <select class="child-gender w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 text-sm">
                    <option value="male" ${gender === 'male' ? 'selected' : ''}>남</option>
                    <option value="female" ${gender === 'female' ? 'selected' : ''}>여</option>
                </select>
            </div>
            <div class="space-y-1.5 col-span-1">
                <p class="text-xs font-semibold text-slate-500">생년월일</p>
                <input class="child-birth w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 text-sm" type="date" value="${birthdate}" />
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
}

// edit_member 페이지가 아닐 경우 실행 안함
if (saveBtn) {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');

    if (!memberId) {
        alert("멤버 지칭 ID가 없습니다.");
        window.location.href = 'index.html';
    } else {
        const docRef = doc(db, 'members', memberId);

        // Load member data
        (async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    document.getElementById('memberName').value = data.name || '';
                    document.getElementById('memberRole').value = data.role || '';
                    document.getElementById('memberPhone').value = data.phone || '';
                    document.getElementById('memberBirthdate').value = data.birthdate || '';
                    document.getElementById('memberSpouse').value = data.spouse || '';
                    document.getElementById('memberAnniversary').value = data.anniversary || '';
                    document.getElementById('memberPrayerRequest').value = data.prayerRequest || '';
                    document.getElementById('memberNotes').value = data.notes || '';

                    // Load children data
                    if (data.children && Array.isArray(data.children) && data.children.length > 0) {
                        data.children.forEach(child => {
                            childrenContainer.appendChild(createChildFields(child.name, child.gender, child.birthdate));
                        });
                    } else {
                        // Default: show 1 empty child field if no data exists
                        childrenContainer.appendChild(createChildFields());
                    }
                } else {
                    alert("존재하지 않는 멤버입니다.");
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error("Error fetching member: ", error);
                alert("멤버 정보를 불러오지 못했습니다.");
            }
        })();

        // Update member data
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            saveBtn.disabled = true;
            saveBtn.textContent = '수정 중...';

            try {
                // Collect children data
                const children = [];
                const childEntries = document.querySelectorAll('.child-entry');
                childEntries.forEach(entry => {
                    const name = entry.querySelector('.child-name').value;
                    const gender = entry.querySelector('.child-gender').value;
                    const birthdate = entry.querySelector('.child-birth').value;
                    if (name) {
                        children.push({ name, gender, birthdate });
                    }
                });

                const updatedMember = {
                    name: document.getElementById('memberName').value,
                    role: document.getElementById('memberRole').value,
                    phone: document.getElementById('memberPhone').value,
                    birthdate: document.getElementById('memberBirthdate').value,
                    spouse: document.getElementById('memberSpouse').value,
                    anniversary: document.getElementById('memberAnniversary').value,
                    children: children, // Update children
                    prayerRequest: document.getElementById('memberPrayerRequest').value,
                    notes: document.getElementById('memberNotes').value,
                    updatedAt: serverTimestamp()
                };

                if (!updatedMember.name) {
                    alert('남편 이름을 입력해주세요.');
                    saveBtn.disabled = false;
                    saveBtn.textContent = '저장하기';
                    return;
                }

                await updateDoc(docRef, updatedMember);
                alert('성공적으로 수정되었습니다.');
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Error updating document: ", error);
                alert('수정 중 오류가 발생했습니다.');
                saveBtn.disabled = false;
                saveBtn.textContent = '저장하기';
            }
        });
    }
}
