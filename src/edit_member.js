import { db } from './firebase.js';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const saveBtn = document.getElementById('saveMemberBtn');

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
                const updatedMember = {
                    name: document.getElementById('memberName').value,
                    role: document.getElementById('memberRole').value,
                    phone: document.getElementById('memberPhone').value,
                    birthdate: document.getElementById('memberBirthdate').value,
                    spouse: document.getElementById('memberSpouse').value,
                    anniversary: document.getElementById('memberAnniversary').value,
                    prayerRequest: document.getElementById('memberPrayerRequest').value,
                    notes: document.getElementById('memberNotes').value,
                    updatedAt: serverTimestamp()
                };

                if (!updatedMember.name) {
                    alert('이름을 입력해주세요.');
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
