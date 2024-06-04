import React, {createContext,useContext, useState, useEffect} from 'react';

import { ModeContext } from './components/ModeContext';
import { ClearContext } from './components/ClearContext';
import { ValAContext } from './components/ValAContext';
import { ValBContext } from './components/ValBContext';
import { ResultContext } from './components/ResultContext';
import { PrevOperatorContext } from './components/PrevOperatorContext';
import { OperatorContext } from './components/OperatorContext';

import Tab from './components/Tab';
import Display from './components/Display';
import Buttons from './components/Buttons';





export default function Calculator() {

    
    const {mode, setMode} = useContext(ModeContext);
    const [clear, setClear] = useState(false);

    // Setting default values for ValA, ValB,Operator Context;
    const [valA,setValA] = useState('');
    const [valB,setValB] = useState('');
    const [prevOperator, setPrevOperator] = useState('');
    const [operator,setOperator] = useState('');
    const [result, setResult] = useState('')

    console.log(mode);
    
    return (
        <div className={['calculator', 'w-full', 'sm:w-[375px]', 'sm:h-min', , 'shadow-sm', 'backdrop-blur-sm', 'rounded-3xl', mode === 'light' ? 'whitebg-grad sm:shadow-[#339DFF]': 'blackbg-grad sm:shadow-white'].join(' ')}
        >

            <Tab/>
            <ClearContext.Provider value={{clear, setClear}}>
                <ValAContext.Provider value={{valA, setValA}}>
                    <ValBContext.Provider value={{valB,setValB}}>
                        <PrevOperatorContext.Provider value={{prevOperator, setPrevOperator}}>
                            <OperatorContext.Provider value={{operator, setOperator}}>
                                <ResultContext.Provider value={{result, setResult}}>
                                    
                                    <Display/>
                                    <Buttons/>

                                </ResultContext.Provider>
                            </OperatorContext.Provider>
                        </PrevOperatorContext.Provider>
                    </ValBContext.Provider>
                </ValAContext.Provider>
            </ClearContext.Provider>

        </div>
    )
}