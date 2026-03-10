import React from 'react';

export default function Screen2() {
  return (
    <>

<div className="flex min-h-screen">
{/*  Side Navigation  */}
<aside className="w-64 border-r border-primary/20 bg-white dark:bg-background-dark hidden lg:flex flex-col sticky top-0 h-screen">
<div className="p-6 flex flex-col h-full">
<div className="flex items-center gap-3 mb-8">
<div className="bg-primary/20 p-2 rounded-lg text-primary">
<span className="material-symbols-outlined">church</span>
</div>
<div>
<h1 className="font-bold text-lg leading-tight">우리교회</h1>
<p className="text-xs text-slate-500">사랑방 대시보드</p>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-slate-900 font-semibold shadow-sm" href="#">
<span className="material-symbols-outlined">home</span>
<span>홈</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">group</span>
<span>멤버</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">check_circle</span>
<span>출석</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">volunteer_activism</span>
<span>기도 제목</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors" href="#">
<span className="material-symbols-outlined">description</span>
<span>모임 노트</span>
</a>
</nav>
<div className="mt-auto pt-6 border-t border-primary/10">
<div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
<div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold overflow-hidden" data-alt="User profile photo of a smiling man" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGTgp2a8n5KieJGm8XvhmW9WFO7R3DfGqLPdAKywjj3E2aR5fqZUNgCl3gkn71gpkFjlCds2RnE5a2c_AXdtleGlTl1obxuSIl3hsBiM7y0xfNwdZ6JVX-W7ZXHqYqpBw2BaTWyikCVTyw9W-7iXaRq6PSkRLyCQUdG95xQjXTVJFPgBKiyPSh9ZggTmuivv01bwvWOg1D-DCF_tANItkLBqy5vncnf9GTrI2a1H1BMWPL1FY8xEOC-MdP-PBrVf1OfILn6COT3uNJ')"}}>
</div>
<div className="flex-1 min-w-0">
<p className="text-sm font-bold truncate">김철수 리더</p>
<p className="text-xs text-slate-500 truncate">관리자 계정</p>
</div>
</div>
</div>
</div>
</aside>
{/*  Main Content  */}
<main className="flex-1 p-4 lg:p-8 overflow-y-auto">
{/*  Header  */}
<header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
<div>
<h2 className="text-3xl font-black tracking-tight">소그룹 개요</h2>
<p className="text-slate-500">2023년 10월 27일 금요일 모임 준비</p>
</div>
<div className="flex items-center gap-3">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
<input className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary w-full md:w-64 shadow-sm" placeholder="멤버 검색..." type="text"/>
</div>
<button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-slate-600 hover:text-primary">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
{/*  Top Section: Next Meeting & Summary Stats  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
{/*  Next Meeting Card  */}
<div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
<div className="md:w-1/3 bg-cover bg-center h-48 md:h-auto" data-alt="A warm living room with people gathering" data-location="Seoul" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyx7ux_zr8nMe8dxDtBh-H5clSni-ebPwrxXfrv8Z6Wjc3MLdx-Xe1DPENamGLmFPlPgQnZvobnsokVCGnILUbvwqD7i5Dm7Pkfv8xDoI-g7RqzWjlpqUBZ1vKVkEvc11V5cO4LfNhI2nBFIcBKz4G4aGd9k2tQclPlBuQHidLjl6yEB7CbX23NnzEbCC0OFw1EgpVL8uW2xP9PDq48k7C2qqu_s09ZjtpGBAPp3qvc-RF1-MN8mdX96p-zWks3kTDSK-RemNMD77-')"}}>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<span className="px-3 py-1 bg-primary/20 text-primary-dark font-bold text-xs rounded-full">다음 모임</span>
<h3 className="text-xl font-bold mt-2">이번 주 금요일 저녁 모임</h3>
<div className="mt-4 space-y-2">
<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
<span className="material-symbols-outlined text-primary">calendar_today</span>
<span>2023년 10월 27일 오후 7:30</span>
</div>
<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
<span className="material-symbols-outlined text-primary">location_on</span>
<span>이영희&amp;박지민 성도님 댁 (강남구 삼성동)</span>
</div>
</div>
</div>
<div className="mt-6 flex gap-3">
<button className="flex-1 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity">길찾기</button>
<button className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 font-bold rounded-xl">상세 정보</button>
</div>
</div>
</div>
{/*  Summary Stats  */}
<div className="space-y-4">
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-primary">
<p className="text-slate-500 text-sm">등록 멤버</p>
<div className="flex items-end justify-between mt-1">
<h4 className="text-3xl font-black">15명</h4>
<span className="text-primary text-sm font-bold">6가정</span>
</div>
</div>
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-slate-300">
<p className="text-slate-500 text-sm">평균 출석률</p>
<div className="flex items-end justify-between mt-1">
<h4 className="text-3xl font-black">88%</h4>
<span className="text-slate-400 text-sm">지난 4주 기준</span>
</div>
</div>
<div className="bg-primary/10 p-6 rounded-xl border border-primary/20 flex items-center justify-between">
<div>
<p className="font-bold text-slate-800 dark:text-slate-100">새 기도제목</p>
<p className="text-sm text-slate-500">4개가 새로 올라왔습니다</p>
</div>
<span className="material-symbols-outlined text-primary text-3xl">chat</span>
</div>
</div>
</div>
{/*  Middle Section: Attendance & Prayer Requests  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
{/*  Attendance Check  */}
<section>
<div className="flex items-center justify-between mb-4">
<h3 className="text-xl font-bold flex items-center gap-2">
<span className="material-symbols-outlined">how_to_reg</span>
                        이번 주 출석 체크
                    </h3>
<button className="text-primary text-sm font-bold hover:underline">모두 출석</button>
</div>
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden">
{/*  Family Group  */}
<div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">김</div>
<div>
<p className="font-bold text-sm">김철수 &amp; 이영희 가정</p>
<p className="text-xs text-slate-500">성인 2, 자녀 2</p>
</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 bg-primary text-xs font-bold rounded-lg">참석</button>
<button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg text-slate-400">결석</button>
</div>
</div>
<div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">박</div>
<div>
<p className="font-bold text-sm">박지민 &amp; 최수연 가정</p>
<p className="text-xs text-slate-500">성인 2</p>
</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 bg-primary text-xs font-bold rounded-lg">참석</button>
<button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg text-slate-400">결석</button>
</div>
</div>
<div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">최</div>
<div>
<p className="font-bold text-sm">최민호 &amp; 정지수 가정</p>
<p className="text-xs text-slate-500">성인 2, 자녀 1</p>
</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg text-slate-400">참석</button>
<button className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg">결석</button>
</div>
</div>
<div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">이</div>
<div>
<p className="font-bold text-sm">이성진 성도</p>
<p className="text-xs text-slate-500">청년</p>
</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 bg-primary text-xs font-bold rounded-lg">참석</button>
<button className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg text-slate-400">결석</button>
</div>
</div>
</div>
</section>
{/*  Recent Prayer Requests  */}
<section>
<div className="flex items-center justify-between mb-4">
<h3 className="text-xl font-bold flex items-center gap-2">
<span className="material-symbols-outlined">volunteer_activism</span>
                        최근 기도 제목
                    </h3>
<button className="text-primary text-sm font-bold hover:underline">전체 보기</button>
</div>
<div className="space-y-4">
<div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
<div className="flex items-center gap-3 mb-3">
<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">이</div>
<span className="font-bold text-sm">이영희</span>
<span className="text-xs text-slate-400">2시간 전</span>
</div>
<p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            막내 아들 민수가 이번 주에 감기가 심하게 걸렸습니다. 빨리 회복하여 금요일 모임에 함께할 수 있도록 기도 부탁드립니다.
                        </p>
<div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
<button className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-sm">favorite</span> 기도할게요 (5)</button>
<button className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-sm">chat_bubble</span> 댓글 (2)</button>
</div>
</div>
<div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
<div className="flex items-center gap-3 mb-3">
<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">박</div>
<span className="font-bold text-sm">박지민</span>
<span className="text-xs text-slate-400">어제</span>
</div>
<p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            새로 시작한 프로젝트가 잘 마무리되게 하시고, 업무 중에도 주님의 지혜로 승리할 수 있게 기도해 주세요.
                        </p>
<div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
<button className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-sm">favorite</span> 기도할게요 (3)</button>
</div>
</div>
</div>
</section>
</div>
{/*  Bottom Section: Member List Table  */}
<section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
<div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
<h3 className="text-xl font-bold">소그룹 멤버 명단</h3>
<button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600">명단 내보내기</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-slate-50 dark:bg-slate-700/50">
<tr>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">이름 / 가정</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">역할</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">연락처</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">최근 출석</th>
<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">관리</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 dark:divide-slate-700">
<tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-slate-100" data-alt="Portrait of a male group member" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXvFxtm1ptu9zziw7_RmVqUz_UMyoagTDWL7kWtJWq0bF2E2zxm__wY77BCrcCX2faN6kFFmyS49arR_kmLBA0FmI323CF1NHgNlYjioUvcfiQ191RuGQfy7zNonjUAb-rSYglKYiO-11CGqMAL5NHwQ_NQlQfqGY9lP32EATHPshX3RbCzUna6G04n-6UkLng6BNpmC-Et55WbSB_lQvkdXpc6kweP76UWYBy2KiNwy7vK52YPiVn6WJGewb7NtkT-69SmBMx8B4V')"}}></div>
<span className="font-medium">김철수 &amp; 이영희</span>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-primary/10 text-primary-dark text-xs font-bold rounded-lg">리더</span>
</td>
<td className="px-6 py-4 text-sm text-slate-500">010-1234-5678</td>
<td className="px-6 py-4">
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
</div>
</td>
<td className="px-6 py-4">
<button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-slate-100" data-alt="Portrait of a female group member" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAM90-yvDpdadAD1vWjR64wEJLKnt_dMNIFUleKrbms9Tq6FqXEtlDyI9DvxHhJNhoce7PPXFBOTgQK7UOQdnkuscCQA_17AvUAimrA4xm6qp7VIS4py5oY1MeynBUy9EjKXZjPNulXD9_9IWq0Sj58IxXC-oR3yy7B4D2N39bqLHgF0l1-o40HLIjZy1gMOwN2pzQ4Db3YZP3FSoMGIRvGrP8eiDu19juWcPxqpcj8iFhevjMxKukbJkrR-9dxXKmHx_2oN52dnAuT')"}}></div>
<span className="font-medium">박지민 &amp; 최수연</span>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg">멤버</span>
</td>
<td className="px-6 py-4 text-sm text-slate-500">010-2233-4455</td>
<td className="px-6 py-4">
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-slate-200"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
</div>
</td>
<td className="px-6 py-4">
<button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-slate-100" data-alt="Portrait of a male group member" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCONFpj1BAqxTDOefihRuys52iSpkx4BCFiig0yXAHm-yPjGX35clKkrcSADBx8v3xpbIaYzIT_Ehsqb4oyPCrZpP5vONmtzfbNPzxpD9s7qfEaHjyXclpjgFYusUQpOrJSgt0bv0XNgLKQp3ov-ONqaz4ppIN_tdgraih9WHvSsl6-PrESVjgJ5f0f_kAvDeoponPUAmSpR7MSgzLcbE1C_totIq13r4tABBoCGkAi_2TyZEDVm1HZ8hrHYOH3TCqGVgVmbkTg6ry')"}}></div>
<span className="font-medium">최민호 &amp; 정지수</span>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-lg">멤버</span>
</td>
<td className="px-6 py-4 text-sm text-slate-500">010-8888-9999</td>
<td className="px-6 py-4">
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-slate-200"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
<div className="w-2 h-2 rounded-full bg-primary"></div>
</div>
</td>
<td className="px-6 py-4">
<button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-6 bg-slate-50 dark:bg-slate-700/30 text-center">
<button className="text-primary font-bold hover:underline">모든 멤버 보기</button>
</div>
</section>
</main>
</div>

    </>
  );
}
