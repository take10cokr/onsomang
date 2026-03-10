import React, { useState } from 'react';
import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Screen3 from './pages/Screen3';
import Screen4 from './pages/Screen4';

function App() {
  const [current, setCurrent] = useState('screen2');

  const renderScreen = () => {
    switch (current) {
      case 'screen1': return <Screen1 />;
      case 'screen2': return <Screen2 />;
      case 'screen3': return <Screen3 />;
      case 'screen4': return <Screen4 />;
      default: return <Screen2 />;
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <p className="font-bold text-slate-800 mb-3 text-sm">✨ 영자의 프로토타입 내비게이션</p>
        <div className="flex flex-col gap-2">
          <button onClick={() => setCurrent('screen1')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 hover:bg-primary/20 hover:text-primary transition-colors text-left font-medium">1. 멤버 상세 및 기도제목</button>
          <button onClick={() => setCurrent('screen2')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 hover:bg-primary/20 hover:text-primary transition-colors text-left font-medium">2. 소그룹 대시보드</button>
          <button onClick={() => setCurrent('screen3')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 hover:bg-primary/20 hover:text-primary transition-colors text-left font-medium">3. 회계 관리</button>
          <button onClick={() => setCurrent('screen4')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-700 hover:bg-primary/20 hover:text-primary transition-colors text-left font-medium">4. 멤버 추가</button>
        </div>
      </div>
      {renderScreen()}
    </>
  );
}

export default App;
