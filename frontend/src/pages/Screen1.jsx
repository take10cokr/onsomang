import React from 'react';

export default function Screen1() {
  return (
    <>

<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
{/*  Top Navigation Bar  */}
<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 bg-background-light px-6 py-4 md:px-40">
<div className="flex items-center gap-4">
<div className="text-primary">
<span className="material-symbols-outlined text-3xl">church</span>
</div>
<h2 className="text-lg font-bold leading-tight tracking-tight">우리 소그룹</h2>
</div>
<div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
<label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
<div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-primary/10">
<div className="text-primary flex items-center justify-center pl-4">
<span className="material-symbols-outlined">search</span>
</div>
<input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 px-4 text-base font-normal" placeholder="멤버 검색" value=""/>
</div>
</label>
<button className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-slate-900">
<span className="material-symbols-outlined">add</span>
</button>
<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" data-alt="User profile avatar circle" style={{"backgroundImage":"url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAA_D1lEwf7jbqPBQClx4aJtEBKBTVWPiAy4VvdLdkbYAzqyJ5AKuEvo2MMbb-Spw2fGUDTQIDynA6v-zrHGYJxg_KewaQUsD3fMvCzROLOvG5D_JJS-ea_qXgDSZs-pl9uWdAni2LHBM_415H3LOpSLNHWAQAgn4D0Sk5BVnwzxRfx-RjNDwOtiK04bl83uOACP7umP0V2YOusN1MfsWFt3WYbrlIcoaNPdvs6yFJVLcVtTP_lch6daqlZQNbUU1d3ywil0iIrWbMR\")"}}></div>
</div>
</header>
<main className="flex flex-1 flex-col md:flex-row px-4 md:px-40 py-8 gap-8">
{/*  Sidebar: Group Info & Quick Menu  */}
<aside className="w-full md:w-64 flex flex-col gap-6">
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
<h1 className="text-lg font-bold">은혜 교회</h1>
<p className="text-primary text-sm font-medium">사랑 소그룹</p>
<nav className="mt-6 flex flex-col gap-2">
<a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-sm font-medium">홈</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-slate-900 font-bold" href="#">
<span className="material-symbols-outlined">group</span>
<span className="text-sm font-medium">멤버 관리</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">list_alt</span>
<span className="text-sm font-medium">기도노트</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-sm font-medium">설정</span>
</a>
</nav>
</div>
</aside>
{/*  Content Area  */}
<div className="flex-1 flex flex-col gap-6">
{/*  Tabs  */}
<div className="border-b border-primary/20 flex gap-8">
<button className="border-b-4 border-primary pb-3 text-sm font-bold px-2">가족별 멤버</button>
<button className="border-b-4 border-transparent pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 px-2">기도제목 통합</button>
</div>
{/*  Member Detail Grid (Initially showing Family Lists)  */}
<div className="grid grid-cols-1 gap-4">
{/*  Family Item 1  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">김철수 &amp; 이영희 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
<div className="p-2 divide-y divide-primary/5">
{/*  Member Profile 1  */}
<details className="group">
<summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 list-none">
<div className="flex items-center gap-4">
<div className="size-12 rounded-full bg-slate-200 bg-cover bg-center" data-alt="Portrait of a smiling man" style={{"backgroundImage":"url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuDjtN5YuFcquOXibd17vFUtraeEgd_CT_PGPm1tlbCzuH2JTb5GgyWWd4nyE-HAdex5GFl3nFjDv6-5Rij_DVKtDaIG9rjehRRsy9_1C6yXpDdd549EmI1C1tN_Z3R2x-ND-CxbPRs96l3I-q3KYoHe6SMV2NFW1VxjZwjZSJjlm53q0NAkCpPUP7RCs9dz0FwIHy63gY41Y6HsFTZNJn6p30sAHaSFVb2_Bp2PdDsAwxm88se1Or6Dt4hB01YsYkQvByr4tfbG3ZeJ\")"}}></div>
<div>
<p className="font-bold">김철수</p>
<p className="text-xs text-slate-500">가장 · 남편</p>
</div>
</div>
<span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-6 pb-6 pt-2">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-3">
<h4 className="text-sm font-bold text-primary flex items-center gap-1 border-b border-primary/10 pb-1">
<span className="material-symbols-outlined text-base">info</span> 상세 정보
                                            </h4>
<div className="text-sm space-y-2">
<div className="flex justify-between"><span className="text-slate-500">생년월일</span><span>1978. 05. 14</span></div>
<div className="flex justify-between"><span className="text-slate-500">연락처</span><span>010-1234-5678</span></div>
<div className="flex justify-between"><span className="text-slate-500">직분</span><span>집사</span></div>
</div>
<button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors">정보 수정</button>
</div>
<div className="space-y-3">
<div className="flex justify-between items-center border-b border-primary/10 pb-1">
<h4 className="text-sm font-bold text-primary flex items-center gap-1">
<span className="material-symbols-outlined text-base">favorite</span> 기도제목
                                                </h4>
<button className="text-xs text-primary font-bold">+ 추가</button>
</div>
<ul className="text-sm space-y-3">
<li className="p-3 bg-primary/5 rounded-lg relative">
<p className="pr-6">직장 내 새로운 프로젝트를 잘 감당하고 지혜를 주시기를 기도합니다.</p>
<span className="text-[10px] text-slate-400">2023.10.20</span>
<span className="material-symbols-outlined absolute top-2 right-2 text-slate-300 text-sm">edit</span>
</li>
<li className="p-3 bg-slate-100 rounded-lg relative opacity-70">
<div className="flex items-center gap-1 text-primary text-[10px] font-bold mb-1">
<span className="material-symbols-outlined text-[12px]">check_circle</span> 응답받음
                                                    </div>
<p className="pr-6">가족 여행을 통해 쉼과 회복이 있는 시간 되게 하소서.</p>
<span className="text-[10px] text-slate-400">2023.08.15</span>
</li>
</ul>
</div>
</div>
</div>
</details>
{/*  Member Profile 2  */}
<details className="group">
<summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 list-none">
<div className="flex items-center gap-4">
<div className="size-12 rounded-full bg-slate-200 bg-cover bg-center" data-alt="Portrait of a smiling woman" style={{"backgroundImage":"url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuAj1DEdaj7g1cAA8PTnKPBiI2CdJrpFIxcimq7gW1ZPNHF8sv_nCxmhNoIobm5KtPPrU4rt5W-5hyH3ZVa4CappzopxDQ_Tw15dr5meVOfK9MpNm4dHAEYOT4kj3V4zId3G_jT4b7OIq2dScj6_jL9K8emcVAQoh-3waEed86eFakfJHNzSl1eeupJ6vPTStlngZ8moS6DxqEpl33PKerQMOeLhmOq-R5dfPaiYx9eTyvYOqcbPiILL9r_5-cdJO04NlMAbuwzczYS8\")"}}></div>
<div>
<p className="font-bold">이영희</p>
<p className="text-xs text-slate-500">아내</p>
</div>
</div>
<span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div className="px-6 pb-6 pt-2">
<p className="text-sm text-center py-8 text-slate-400">상세 정보를 불러오려면 클릭하세요.</p>
</div>
</details>
</div>
</div>
{/*  Family Item 2  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5 opacity-90">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">박지민 &amp; 최유진 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
<div className="p-2 flex justify-between items-center text-slate-400 px-4 py-3 italic text-sm">
                            내용을 보려면 가정을 선택하세요
                            <span className="material-symbols-outlined">chevron_right</span>
</div>
</div>
{/*  Family Item 3  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5 opacity-80">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">정민호 &amp; 강수연 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
</div>
{/*  Family Item 4  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5 opacity-70">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">윤석진 &amp; 임지혜 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
</div>
{/*  Family Item 5  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5 opacity-60">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">한상우 &amp; 오은주 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
</div>
{/*  Family Item 6  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-primary/5 opacity-50">
<div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">family_restroom</span>
<h3 className="font-bold">고태양 &amp; 서하늘 가정</h3>
</div>
<span className="text-xs bg-primary/20 text-slate-700 px-2 py-1 rounded-full">2인 가족</span>
</div>
</div>
</div>
{/*  Footer Summary  */}
<div className="mt-8 p-6 bg-primary/10 rounded-xl border-2 border-dashed border-primary/30 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="bg-primary p-3 rounded-full text-slate-900">
<span className="material-symbols-outlined">volunteer_activism</span>
</div>
<div>
<p className="font-bold">이번 주 기도제목 요약</p>
<p className="text-sm text-slate-600">총 12명의 멤버 중 8명이 새로운 기도제목을 나누었습니다.</p>
</div>
</div>
<button className="px-6 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:shadow-lg transition-all">전체 기도제목 PDF로 받기</button>
</div>
</div>
</main>
{/*  Footer  */}
<footer className="mt-auto px-6 py-8 md:px-40 border-t border-primary/10 bg-white dark:bg-slate-900 text-slate-500 text-sm text-center">
<p>© 2023 은혜 교회 사랑 소그룹 매니저. 모든 멤버의 프라이버시를 존중합니다.</p>
</footer>
</div>
</div>

    </>
  );
}
