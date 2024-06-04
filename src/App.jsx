import React, {useState, useEffect, createContext} from 'react';

import { ModeContext } from './components/ModeContext';
import Calculator from './Calculator';
 




export default function App() {

  let [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

  // We create a useEffect to save the present mode to localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode);
  },[mode])

  return (
    <ModeContext.Provider value={{mode, setMode}}>
      <div className={['w-full', 'sm:h-full','flex', 'justify-center', 'items-center', 'bg-[url("./assets/bubbleBg.png")]', 'bg-no-repeat', 'bg-center', mode=== 'light'? 'bg-[#ADD8FF]' : 'bg-black'].join(' ')}
      >
      <Calculator/>
      </div>
    </ModeContext.Provider>
  );
}