import React, {useState, useContext} from 'react';

import { ModeContext } from './ModeContext';

//Here we are creating the tab for our night or dark mode button

export default function Tab() {
    const {mode, setMode} = useContext(ModeContext);
    
    return (
        <div className="calculatorTab flex flex-row justify-items-end px-5 pt-5 mt-5">
            <button 
            className={['ml-auto','border-none', 'text-[20px]', mode==='light'? 'text-black': 'text-white'].join(' ')} type='button'
            onClick={() => {
                setMode(mode === 'light'? 'dark' : 'light')
            }}
            >

            {
            mode === 'light'? 
            <i className="fa-sharp fa-light fa-moon-stars"></i> : 
            <i className="fa-light fa-sun-bright"></i>
            } 

            </button>
        </div>
    )
}