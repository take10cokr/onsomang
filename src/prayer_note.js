import { db } from './firebase.js';
import {
    collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, getDocs
} from 'firebase/firestore';
import { setupAuthUI } from './authUI.js';

setupAuthUI('sidebarAuth');


const prayerGrid = document.getElementById('prayerGrid');
const modal = document.getElementById('prayerModal');
const addPrayerBtn = document.getElementById('addPrayerBtn');
const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const savePrayerBtn = document.getElementById('savePrayerBtn');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// 댓글 패널 elements
const commentPanel = document.getElementById('commentPanel');
const commentPanelTitle = document.getElementById('commentPanelTitle');
const commentList = document.getElementById('commentList');
const commentAuthorInput = document.getElementById('commentAuthor');
const commentTextInput = document.getElementById('commentText');
const submitCommentBtn = document.getElementById('submitCommentBtn');
const closeCommentPanel = document.getElementById('closeCommentPanel');

let allPrayers = [];
let currentFilter = 'all';
let currentSearch = '';
let editingId = null;
let currentPrayerId = null;
let commentUnsubscribe = null;

// Tag color map
const tagColors = {
    '가정/자녀': 'bg-orange-100 text-orange-700',
    '건강/치유': 'bg-green-100 text-green-700',
    '직장/학업': 'bg-blue-100 text-blue-700',
    '🔥 긴급': 'bg-red-100 text-red-700',
    '개인': 'bg-purple-100 text-purple-700',
    '응답됨': 'bg-emerald-100 text-emerald-700',
};

function formatDate(ts) {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function formatDateTime(ts) {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ── 모달 등록/수정 ──────────────────────────────────────────
function openAddModal() {
    editingId = null;
    modalTitle.textContent = '기도제목 등록';
    savePrayerBtn.textContent = '등록하기';
    document.getElementById('prayerAuthor').value = '';
    document.getElementById('prayerContent').value = '';
    const defaultTag = document.querySelector('input[name="prayerTag"][value="개인"]');
    if (defaultTag) defaultTag.checked = true;
    modal.classList.remove('hidden');
}

function openEditModal(id, data) {
    editingId = id;
    modalTitle.textContent = '기도제목 수정';
    savePrayerBtn.textContent = '수정하기';
    document.getElementById('prayerAuthor').value = data.author || '';
    document.getElementById('prayerContent').value = data.content || '';
    const tagInput = document.querySelector(`input[name="prayerTag"][value="${data.tag}"]`);
    if (tagInput) tagInput.checked = true;
    modal.classList.remove('hidden');
}

function closeModalFn() {
    modal.classList.add('hidden');
    editingId = null;
}

// ── 댓글 패널 ──────────────────────────────────────────────
function openCommentPanel(prayerId, prayerAuthor) {
    currentPrayerId = prayerId;
    commentPanelTitle.textContent = `${prayerAuthor}의 기도제목`;
    commentAuthorInput.value = '';
    commentTextInput.value = '';
    commentList.innerHTML = `<div class="text-center text-slate-400 py-8">댓글을 불러오는 중...</div>`;
    commentPanel.classList.remove('translate-x-full');
    document.getElementById('commentOverlay').classList.remove('hidden');

    // 기존 구독 해제
    if (commentUnsubscribe) commentUnsubscribe();

    // 실시간 댓글 구독
    const q = query(
        collection(db, 'prayers', prayerId, 'comments'),
        orderBy('createdAt', 'asc')
    );
    commentUnsubscribe = onSnapshot(q, (snapshot) => {
        renderComments(snapshot.docs);
    });
}

function closeCommentPanelFn() {
    commentPanel.classList.add('translate-x-full');
    document.getElementById('commentOverlay').classList.add('hidden');
    if (commentUnsubscribe) {
        commentUnsubscribe();
        commentUnsubscribe = null;
    }
    currentPrayerId = null;
}

function renderComments(docs) {
    if (docs.length === 0) {
        commentList.innerHTML = `
            <div class="text-center text-slate-400 py-10">
                <span class="material-symbols-outlined text-3xl mb-2 block">chat_bubble_outline</span>
                <p class="text-sm">아직 댓글이 없어요</p>
                <p class="text-xs mt-1">첫 번째로 응원의 말을 남겨주세요 💚</p>
            </div>`;
        return;
    }

    commentList.innerHTML = docs.map(d => {
        const data = d.data();
        const firstChar = (data.author || '익')[0];
        return `
            <div class="flex gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">${firstChar}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline gap-2 mb-1">
                        <span class="font-bold text-sm">${data.author || '익명'}</span>
                        <span class="text-xs text-slate-400">${formatDateTime(data.createdAt)}</span>
                    </div>
                    <p class="text-sm text-slate-700 dark:text-slate-300 break-words leading-relaxed">${(data.text || '').replace(/\n/g, '<br>')}</p>
                </div>
            </div>`;
    }).join('');

    // 스크롤 맨 아래로
    commentList.scrollTop = commentList.scrollHeight;
}

// ── 카드 렌더링 ─────────────────────────────────────────────
function renderCards(prayers) {
    prayerGrid.innerHTML = '';

    if (prayers.length === 0) {
        prayerGrid.innerHTML = `
            <div class="col-span-full p-12 text-center text-slate-400">
                <span class="material-symbols-outlined text-5xl mb-3 block">volunteer_activism</span>
                <p class="text-lg font-semibold mb-1">기도제목이 없습니다</p>
                <p class="text-sm">위의 버튼을 눌러 기도제목을 올려주세요 🙏</p>
            </div>`;
        return;
    }

    prayers.forEach(({ id, data }) => {
        const tag = data.tag || '개인';
        const tagClass = tagColors[tag] || 'bg-slate-100 text-slate-600';
        const isAnswered = data.answered === true;
        const prayCount = data.prayCount || 0;
        const commentCount = data.commentCount || 0;
        const dateStr = formatDate(data.createdAt);
        const firstChar = (data.author || '익')[0];

        const card = document.createElement('div');
        card.className = `bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden card-hover cursor-pointer ${isAnswered ? 'opacity-75' : ''}`;
        card.dataset.id = id;

        card.innerHTML = `
            <div class="p-5">
                <div class="flex items-start justify-between mb-3">
                    <span class="tag-badge ${tagClass}">${tag}</span>
                    <div class="flex items-center gap-1">
                        ${isAnswered ? `<span class="tag-badge bg-emerald-100 text-emerald-700 flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">check_circle</span>응답됨</span>` : ''}
                        <button data-id="${id}" class="edit-btn p-1 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="수정">
                            <span class="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>
                </div>
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-lg flex-shrink-0">${firstChar}</div>
                    <div>
                        <p class="font-bold text-base leading-tight">${data.author || '익명'}</p>
                        <p class="text-xs text-slate-400">${dateStr}</p>
                    </div>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4 break-words">${data.content ? data.content.replace(/\n/g, '<br>') : ''}</p>
            </div>
            <div class="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
                <button data-id="${id}" class="pray-btn flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors font-semibold">
                    <span class="material-symbols-outlined text-base">favorite</span>
                    기도할게요 ${prayCount}
                </button>
                <button data-id="${id}" data-author="${data.author || '익명'}" class="comment-btn flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-500 transition-colors font-semibold">
                    <span class="material-symbols-outlined text-base">chat_bubble</span>
                    댓글 ${commentCount}
                </button>
                ${!isAnswered ? `
                <button data-id="${id}" class="answer-btn text-xs text-emerald-600 font-bold hover:underline">응답으로 표시</button>` : ''}
            </div>`;

        prayerGrid.appendChild(card);
    });

    // ✏️ 수정
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const prayer = allPrayers.find(p => p.id === id);
            if (prayer) openEditModal(id, prayer.data);
        });
    });

    // ❤️ 기도할게요
    document.querySelectorAll('.pray-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const prayer = allPrayers.find(p => p.id === id);
            if (!prayer) return;
            await updateDoc(doc(db, 'prayers', id), { prayCount: (prayer.data.prayCount || 0) + 1 });
        });
    });

    // 💬 댓글 버튼
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCommentPanel(btn.dataset.id, btn.dataset.author);
        });
    });

    // ✅ 응답으로 표시
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm('이 기도제목을 응답됨으로 표시할까요? 🙏')) {
                await updateDoc(doc(db, 'prayers', btn.dataset.id), { answered: true });
            }
        });
    });
}

// ── 댓글 제출 ───────────────────────────────────────────────
submitCommentBtn.addEventListener('click', async () => {
    if (!currentPrayerId) return;
    const author = commentAuthorInput.value.trim();
    const text = commentTextInput.value.trim();
    if (!author) { alert('이름을 입력해주세요.'); return; }
    if (!text) { alert('댓글 내용을 입력해주세요.'); return; }

    submitCommentBtn.disabled = true;
    submitCommentBtn.textContent = '등록 중...';

    try {
        await addDoc(collection(db, 'prayers', currentPrayerId, 'comments'), {
            author, text, createdAt: serverTimestamp()
        });
        // commentCount 증가
        const prayer = allPrayers.find(p => p.id === currentPrayerId);
        if (prayer) {
            await updateDoc(doc(db, 'prayers', currentPrayerId), {
                commentCount: (prayer.data.commentCount || 0) + 1
            });
        }
        commentTextInput.value = '';
    } catch (err) {
        console.error(err);
        alert('댓글 등록 중 오류가 발생했습니다.');
    } finally {
        submitCommentBtn.disabled = false;
        submitCommentBtn.textContent = '등록';
    }
});

// Enter 키로 댓글 제출 (Shift+Enter는 줄바꿈)
commentTextInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitCommentBtn.click();
    }
});

// ── Firebase 실시간 ─────────────────────────────────────────
const q = query(collection(db, 'prayers'), orderBy('createdAt', 'desc'));
onSnapshot(q, (snapshot) => {
    allPrayers = snapshot.docs.map(d => ({ id: d.id, data: d.data() }));
    applyFilterAndSearch();
}, (err) => {
    console.error(err);
    prayerGrid.innerHTML = `<div class="col-span-full p-8 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>`;
});

// ── 필터 & 검색 ─────────────────────────────────────────────
function applyFilterAndSearch() {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    let filtered = allPrayers.filter(({ data }) => {
        if (currentSearch) {
            const lower = currentSearch.toLowerCase();
            if (!(data.author || '').toLowerCase().includes(lower) &&
                !(data.content || '').toLowerCase().includes(lower)) return false;
        }
        if (currentFilter === 'week') {
            const d = data.createdAt?.toDate();
            if (!d || d < oneWeekAgo) return false;
        } else if (currentFilter === 'month') {
            const d = data.createdAt?.toDate();
            if (!d || d < twoWeeksAgo || d >= oneWeekAgo) return false;
        } else if (currentFilter === 'answered') {
            if (!data.answered) return false;
        } else if (currentFilter === 'urgent') {
            if (data.tag !== '🔥 긴급') return false;
        } else if (currentFilter === 'personal') {
            if (data.tag !== '개인') return false;
        }
        return true;
    });
    renderCards(filtered);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilterAndSearch();
    });
});
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    applyFilterAndSearch();
});

// ── 기도제목 등록/수정 저장 ────────────────────────────────
addPrayerBtn.addEventListener('click', openAddModal);
[closeModal, cancelModal].forEach(btn => btn.addEventListener('click', closeModalFn));
modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFn(); });

savePrayerBtn.addEventListener('click', async () => {
    const author = document.getElementById('prayerAuthor').value.trim();
    const content = document.getElementById('prayerContent').value.trim();
    const tagInput = document.querySelector('input[name="prayerTag"]:checked');
    const tag = tagInput ? tagInput.value : '개인';

    if (!author) { alert('작성자 이름을 입력해주세요.'); return; }
    if (!content) { alert('기도제목을 입력해주세요.'); return; }

    savePrayerBtn.disabled = true;
    savePrayerBtn.textContent = editingId ? '수정 중...' : '등록 중...';

    try {
        if (editingId) {
            await updateDoc(doc(db, 'prayers', editingId), {
                author, content, tag, updatedAt: serverTimestamp()
            });
        } else {
            await addDoc(collection(db, 'prayers'), {
                author, content, tag,
                prayCount: 0, commentCount: 0, answered: false,
                createdAt: serverTimestamp()
            });
        }
        closeModalFn();
    } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
    } finally {
        savePrayerBtn.disabled = false;
        savePrayerBtn.textContent = editingId ? '수정하기' : '등록하기';
    }
});

// ── 댓글 패널 닫기 ──────────────────────────────────────────
closeCommentPanel.addEventListener('click', closeCommentPanelFn);
document.getElementById('commentOverlay').addEventListener('click', closeCommentPanelFn);
