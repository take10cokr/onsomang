import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const familyListContainer = document.getElementById('familyListContainer');

if (familyListContainer) {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
        familyListContainer.innerHTML = '';

        if (snapshot.empty) {
            familyListContainer.innerHTML = '<div class="p-8 text-center text-slate-500">등록된 멤버가 없습니다.</div>';
            return;
        }

        snapshot.forEach((docSnap) => {
            const member = docSnap.data();
            const id = docSnap.id;

            // Decide family name
            let familyName = member.name || "이름없음";
            if (member.spouse) {
                familyName += ` & ${member.spouse} 가정`;
            } else {
                familyName += " 성도";
            }

            // For family count (just a basic assumption: 1 + (spouse ? 1 : 0))
            const familyCount = member.spouse ? 2 : 1;

            // Format Dates
            const birth = member.birthdate ? member.birthdate.replace(/-/g, '. ') : '정보 없음';
            const phone = member.phone || '정보 없음';
            const role = member.role === 'leader' ? '소그룹 리더' : member.role === 'member' ? '일반 단원' : member.role === 'new' ? '새가족' : '정보 없음';

            // Prayer Request Template
            let prayerHtml = '';
            if (member.prayerRequest) {
                // Formatting date fallback
                const dateRaw = member.createdAt ? member.createdAt.toDate() : new Date();
                const yy = dateRaw.getFullYear();
                const mt = String(dateRaw.getMonth() + 1).padStart(2, '0');
                const dd = String(dateRaw.getDate()).padStart(2, '0');
                const dateStr = `${yy}.${mt}.${dd}`;

                prayerHtml = `
                    <div class="space-y-3">
                        <div class="flex justify-between items-center border-b border-primary/10 pb-1">
                            <h4 class="text-sm font-bold text-primary flex items-center gap-1">
                                <span class="material-symbols-outlined text-base">favorite</span> 기도제목
                            </h4>
                        </div>
                        <ul class="text-sm space-y-3">
                            <li class="p-3 bg-primary/5 rounded-lg relative">
                                <p class="pr-6 break-words">${member.prayerRequest.replace(/\n/g, '<br>')}</p>
                                <span class="text-[10px] text-slate-400 mt-2 block">${dateStr}</span>
                            </li>
                        </ul>
                    </div>
                `;
            } else {
                prayerHtml = `
                    <div class="space-y-3">
                        <div class="flex justify-between items-center border-b border-primary/10 pb-1">
                            <h4 class="text-sm font-bold text-primary flex items-center gap-1">
                                <span class="material-symbols-outlined text-base">favorite</span> 기도제목
                            </h4>
                        </div>
                        <div class="p-4 text-center text-slate-400 text-sm">기도제목이 없습니다.</div>
                    </div>
                `;
            }

            // Main Member Profile UI
            let mainMemberHtml = `
                <details class="group">
                    <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 list-none">
                        <div class="flex items-center gap-4">
                            <div class="size-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-lg">
                                ${(member.name || "?").charAt(0)}
                            </div>
                            <div>
                                <p class="font-bold">${member.name || "이름없음"}</p>
                                <p class="text-xs text-slate-500">${role}</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-3">
                                <h4 class="text-sm font-bold text-primary flex items-center gap-1 border-b border-primary/10 pb-1">
                                    <span class="material-symbols-outlined text-base">info</span> 상세 정보
                                </h4>
                                <div class="text-sm space-y-2">
                                    <div class="flex justify-between"><span class="text-slate-500">생년월일</span><span>${birth}</span></div>
                                    <div class="flex justify-between"><span class="text-slate-500">연락처</span><span>${phone}</span></div>
                                </div>
                                ${member.notes ? `
                                <div class="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                                    <p class="text-xs text-slate-500 font-bold mb-1">메모</p>
                                    <p class="text-sm break-words">${member.notes.replace(/\n/g, '<br>')}</p>
                                </div>
                                ` : ''}
                                <a href="edit_member.html?id=${id}" class="mt-4 block text-center w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold rounded-lg transition-colors">정보 수정</a>
                            </div>
                            ${prayerHtml}
                        </div>
                    </div>
                </details>
            `;

            let spouseHtml = '';
            if (member.spouse) {
                const anni = member.anniversary ? member.anniversary.replace(/-/g, '. ') : '정보 없음';
                spouseHtml = `
                <details class="group">
                    <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 list-none border-t border-primary/5">
                        <div class="flex items-center gap-4">
                            <div class="size-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-lg">
                                ${member.spouse.charAt(0)}
                            </div>
                            <div>
                                <p class="font-bold">${member.spouse}</p>
                                <p class="text-xs text-slate-500">배우자</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div class="px-6 pb-6 pt-2">
                         <div class="space-y-3">
                            <h4 class="text-sm font-bold text-primary flex items-center gap-1 border-b border-primary/10 pb-1">
                                <span class="material-symbols-outlined text-base">info</span> 상세 정보
                            </h4>
                            <div class="text-sm space-y-2">
                                <div class="flex justify-between"><span class="text-slate-500">결혼기념일</span><span>${anni}</span></div>
                            </div>
                        </div>
                    </div>
                </details>
                `;
            }

            const familyCard = document.createElement('div');
            familyCard.className = 'bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5';
            familyCard.innerHTML = `
                <div class="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary">family_restroom</span>
                        <h3 class="font-bold">${familyName}</h3>
                    </div>
                    <span class="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">${familyCount}인 가족</span>
                </div>
                <div class="p-2 divide-y divide-primary/5">
                    ${mainMemberHtml}
                    ${spouseHtml}
                </div>
            `;

            familyListContainer.appendChild(familyCard);
        });
    }, (error) => {
        console.error("Error fetching detail members: ", error);
        familyListContainer.innerHTML = '<div class="p-8 text-center text-red-500">멤버 정보를 불러오는데 실패했습니다.</div>';
    });
}
