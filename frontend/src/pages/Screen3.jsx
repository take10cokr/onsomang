import React from 'react';

export default function Screen3() {
  return (
    <>

<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
{/*  Header Section  */}
<header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-white dark:bg-slate-900 sticky top-0 z-10">
<div className="flex items-center gap-4">
<div className="p-2 bg-primary/20 rounded-lg">
<span className="material-symbols-outlined text-slate-900 dark:text-slate-100">account_balance_wallet</span>
</div>
<div>
<h2 className="text-xl font-bold leading-tight tracking-tight">회계 관리</h2>
<p className="text-xs text-slate-500">은혜로운 교회 · 제1여전도회</p>
</div>
</div>
<div className="flex gap-2">
<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
<span className="material-symbols-outlined text-[20px]">search</span>
</button>
<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
<span className="material-symbols-outlined text-[20px]">download</span>
</button>
</div>
</header>
<main className="flex flex-col gap-6 p-6 max-w-[1200px] mx-auto w-full">
{/*  Hero Balance Card  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-2 bg-primary rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
<div>
<p className="text-slate-900/70 text-sm font-medium">현재 총 잔액</p>
<h3 className="text-slate-900 text-4xl font-bold mt-1">₩1,250,000</h3>
</div>
<div className="flex gap-4 mt-4">
<button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-sm">add_circle</span> 내역 추가
                        </button>
<button className="bg-white/30 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-sm">summarize</span> 보고서 생성
                        </button>
</div>
</div>
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-center gap-4">
<div className="flex justify-between items-center">
<span className="text-sm text-slate-500">이번 달 수입</span>
<span className="text-primary font-bold">+ ₩450,000</span>
</div>
<div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
<div className="flex justify-between items-center">
<span className="text-sm text-slate-500">이번 달 지출</span>
<span className="text-red-500 font-bold">- ₩120,000</span>
</div>
</div>
</div>
{/*  Fee Payment Status  */}
<section className="flex flex-col gap-4">
<div className="flex items-center justify-between">
<h3 className="text-lg font-bold">회비 납부 현황 (2024년)</h3>
<button className="text-sm text-primary font-medium">전체보기</button>
</div>
<div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 dark:bg-slate-800/50">
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800">가정/성함</th>
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 text-center">1월</th>
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 text-center">2월</th>
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 text-center">3월</th>
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 text-center">4월</th>
<th className="p-4 text-sm font-semibold border-b border-slate-100 dark:border-slate-800 text-center">5월</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-50 dark:divide-slate-800">
<tr>
<td className="p-4 text-sm">김철수 &amp; 이영희 가정</td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
</tr>
<tr>
<td className="p-4 text-sm">박지민 성도</td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
</tr>
<tr>
<td className="p-4 text-sm">최준호 &amp; 정나래 가정</td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-primary">check_circle</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
<td className="p-4 text-center"><span className="material-symbols-outlined text-slate-200">radio_button_unchecked</span></td>
</tr>
</tbody>
</table>
</div>
</section>
{/*  Transaction History  */}
<section className="flex flex-col gap-4">
<div className="flex items-center justify-between">
<h3 className="text-lg font-bold">최근 입출금 내역</h3>
<div className="flex gap-2">
<select className="text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg">
<option>전체 카테고리</option>
<option>수입</option>
<option>지출</option>
</select>
</div>
</div>
<div className="flex flex-col gap-3">
{/*  Date Group  */}
<div className="text-xs font-bold text-slate-400 mt-2">2024. 03. 15</div>
<div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
<div className="flex items-center gap-4">
<div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
<span className="material-symbols-outlined">restaurant</span>
</div>
<div>
<p className="text-sm font-bold">구역 식사 모임</p>
<p className="text-xs text-slate-500">지출 · 식사비</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-bold text-red-500">- ₩45,000</p>
<p className="text-xs text-slate-400">잔액 ₩1,250,000</p>
</div>
</div>
<div className="text-xs font-bold text-slate-400 mt-2">2024. 03. 12</div>
<div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
<div className="flex items-center gap-4">
<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
<div>
<p className="text-sm font-bold">김철수 가정 3월 회비</p>
<p className="text-xs text-slate-500">수입 · 회비</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-bold text-primary">+ ₩50,000</p>
<p className="text-xs text-slate-400">잔액 ₩1,295,000</p>
</div>
</div>
<div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
<div className="flex items-center gap-4">
<div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
<span className="material-symbols-outlined">celebration</span>
</div>
<div>
<p className="text-sm font-bold">생일 축하 케이크 구매</p>
<p className="text-xs text-slate-500">지출 · 교제비</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-bold text-red-500">- ₩32,000</p>
<p className="text-xs text-slate-400">잔액 ₩1,245,000</p>
</div>
</div>
<div className="text-xs font-bold text-slate-400 mt-2">2024. 03. 05</div>
<div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
<div className="flex items-center gap-4">
<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">volunteer_activism</span>
</div>
<div>
<p className="text-sm font-bold">특별 선교 목적 헌금</p>
<p className="text-xs text-slate-500">수입 · 기타</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-bold text-primary">+ ₩100,000</p>
<p className="text-xs text-slate-400">잔액 ₩1,277,000</p>
</div>
</div>
</div>
<button className="w-full py-4 text-sm font-medium text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl mt-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    이전 내역 더보기
                </button>
</section>
</main>
{/*  Bottom Navigation Spacer  */}
<div className="h-20"></div>
{/*  Sticky Bottom Bar  */}
<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-around items-center z-20">
<div className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-medium">홈</span>
</div>
<div className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span className="text-[10px] font-bold">회계</span>
</div>
<div className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">group</span>
<span className="text-[10px] font-medium">멤버</span>
</div>
<div className="flex flex-col items-center gap-1 text-slate-400">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-medium">설정</span>
</div>
</nav>
</div>
</div>

    </>
  );
}
