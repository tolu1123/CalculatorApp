import React,{useState, useEffect, useContext} from 'react';


import { ModeContext } from './ModeContext';
import { ClearContext } from './ClearContext';
import { ValAContext } from './ValAContext';
import { ValBContext } from './ValBContext';
import { ResultContext } from './ResultContext';
import { PrevOperatorContext } from './PrevOperatorContext';
import { OperatorContext } from './OperatorContext';

export default function Display() {

    const {mode, setMode} = useContext(ModeContext);
    const {clear, setClear} = useContext(ClearContext)
    const {valA, setValA} = useContext(ValAContext);
    const {valB, setValB} = useContext(ValBContext);
    const {prevOperator, setPrevOperator} = useContext(PrevOperatorContext);
    const {operator, setOperator} = useContext(OperatorContext);
    const {result, setResult} = useContext(ResultContext);

    console.log(clear, prevOperator, operator);

    function displayInput() {
        if (result === '') {
            return valA;
        } else if (result) {
            return `${Number(valA)} ${prevOperator} ${Number(valB)}`
        }
    } 

    function displayOutput() {
        if(result === '') {
            return valB;
        } else if (result.includes('.') && result.substring(result.indexOf('.') + 1).length > 2) {
            return Number(result).toFixed(4)
        } else if(result.length > 9) {
            return Number(result).toExponential(2);
        } else {
            return result;
        }
    }

    function displayOperator() {
        if(operator !== '') {
            return operator;
        } else if (operator === '' && result !== '') {
            return '=';
        }
    }

    return(
        <div className='m-5'>

            <div className={`relative backdrop-blur-md overflow-hidden rounded ${mode==='light' ? 'bg-black/30' :'bg-white/30'} w-full h-28`}>


                {/* The input */}
                <div className="absolute right-0 top-0 input max-w-full w-fit h-1/2 font-semibold py-4 px-2 text-2xl text-white">
                    {
                        // if operator has not been set, display valA
                        displayInput()
                    }

                    {/* The blinking cursor */}
                    {valB === '' && operator === '' && <span className="cursor inline-block w-0.5 h-full ml-0.5 animate-pulse bg-white"></span>}
                </div>

                {/* The output*/}
                <div className={`output flex justify-end text-white items-center w-full max-w-sm h-1/2 absolute right-0 bottom-0 pt-3 pb-1 px-2 ${result === '' ? 'text-2xl': 'font-medium text-4xl'} `}>
                    {
                        // display valB or the result based on context
                        displayOutput()
                    }
                    {/* The blinking cursor */}
                    {operator !== '' && <span className={`cursor inline-block w-0.5 h-full ml-0.5 animate-pulse bg-white ${result === '' ? 'h-6': 'h-9'}`}></span>}
                </div>




                {/* The operator element */}
                <div className="operatorContainer h-1/2 aspect-square absolute left-0 bottom-0 flex items-center justify-center text-white text-4xl">
                    {/* Once any operator is clicked, it will appear here. */}
                    {
                    displayOperator()
                    }
                </div>



                {/* The Display clearing animation */}
                <div className={`animate absolute top-1/2 left-1/2 bg-red-600 w-full h-full ${clear? 'pingOver': 'pingHidden'}`}>

                </div>
            </div>

        </div>
    )
}