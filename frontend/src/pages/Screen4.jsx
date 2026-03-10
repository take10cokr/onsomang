import React from 'react';

export default function Screen4() {
  const formatPhoneNumber = (value) => {
    if (!value) return "";
    value = value.replace(/[^0-9]/g, "");
    let result = [];
    if (value.startsWith("02")) {
      if (value.length <= 2) return value;
      if (value.length <= 5) result.push(value.substr(0, 2), value.substr(2));
      else if (value.length <= 9) result.push(value.substr(0, 2), value.substr(2, 3), value.substr(5));
      else result.push(value.substr(0, 2), value.substr(2, 4), value.substr(6));
    } else {
      if (value.length <= 3) return value;
      if (value.length <= 6) result.push(value.substr(0, 3), value.substr(3));
      else if (value.length <= 10) result.push(value.substr(0, 3), value.substr(3, 3), value.substr(6));
      else result.push(value.substr(0, 3), value.substr(3, 4), value.substr(7));
    }
    return result.join("-");
  };

  const handlePhoneInput = (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
  };

  return (
    <>

      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 lg:px-40">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">교인 추가</h2>
            </div>
            <button className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>
          <main className="flex flex-1 justify-center py-8 px-4 lg:px-40">
            <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-6">
              <div className="bg-white dark:bg-slate-900/50 p-1.5 rounded-xl border border-primary/10 shadow-sm flex">
                <label className="flex-1 cursor-pointer">
                  <input checked="" className="peer hidden" name="type" type="radio" value="family" />
                  <div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-primary peer-checked:text-white text-slate-500">가구/가족 추가</div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input className="peer hidden" name="type" type="radio" value="individual" />
                  <div className="text-center py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-primary peer-checked:text-white text-slate-500">개인 추가</div>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">badge</span> 기본 정보
                  </h3>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">이름</p>
                    <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3" placeholder="이름을 입력하세요" type="text" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">역할</p>
                    <select className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3">
                      <option value="">선택하세요 (리더/단원)</option>
                      <option value="leader">소그룹 리더</option>
                      <option value="member">일반 단원</option>
                      <option value="new">새가족</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">연락처</p>
                    <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3" placeholder="010-0000-0000" type="tel" onChange={handlePhoneInput} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">생년월일</p>
                    <div className="relative">
                      <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3" type="date" />
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">favorite</span> 배우자 정보
                  </h3>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">배우자 이름</p>
                    <input className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3" placeholder="배우자 성명" type="text" />
                  </div>

                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">notes</span> 기도제목 및 비고
                </h3>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">기도제목</p>
                  <textarea className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 resize-none" placeholder="첫 방문 기도제목이나 특별한 요청사항을 입력하세요" rows="3"></textarea>
                </div>
                <div className="space-y-1.5 pt-2">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">기타 메모</p>
                  <textarea className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 resize-none" placeholder="방문 경로, 특이사항 등" rows="2"></textarea>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20">
                  저장하기
                </button>
                <button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-xl transition-all">
                  취소
                </button>
              </div>
            </div>
          </main>
          <footer className="py-10 text-center text-slate-400 text-sm">
            <p>© 2024 Church Management System. All rights reserved.</p>
          </footer>
        </div>
      </div>

    </>
  );
}
