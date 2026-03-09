import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const saveBtn = document.getElementById('saveMemberBtn');

// add_member 페이지가 아닐 경우 실행 안함
if (saveBtn) {
    saveBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        saveBtn.disabled = true;
        saveBtn.textContent = '저장 중...';

        try {
            const newMember = {
                name: document.getElementById('memberName').value,
                role: document.getElementById('memberRole').value,
                phone: document.getElementById('memberPhone').value,
                birthdate: document.getElementById('memberBirthdate').value,
                spouse: document.getElementById('memberSpouse').value,
                anniversary: document.getElementById('memberAnniversary').value,
                prayerRequest: document.getElementById('memberPrayerRequest').value,
                notes: document.getElementById('memberNotes').value,
                createdAt: serverTimestamp()
            };

            if (!newMember.name) {
                alert('이름을 입력해주세요.');
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
