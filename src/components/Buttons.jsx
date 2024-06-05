import React, {useState, useEffect, useContext} from "react";

// The contexts available
import { ModeContext } from "./ModeContext";
import { ClearContext } from "./ClearContext";
import { PrevOperatorContext } from "./PrevOperatorContext";
import { OperatorContext } from "./OperatorContext";
import { ValAContext } from "./ValAContext";
import { ValBContext } from "./ValBContext";
import { ResultContext } from "./ResultContext";

//import operations from operations from functions
import {add, subtract, divide, multiplication} from '../functions/operations'

export default function Buttons() {

    const {mode, setMode} = useContext(ModeContext);
    const {clear, setClear} = useContext(ClearContext);

    
    const {prevOperator, setPrevOperator} = useContext(PrevOperatorContext);
    const {operator, setOperator} = useContext(OperatorContext);
    const {valA, setValA} = useContext(ValAContext);
    const {valB, setValB} = useContext(ValBContext);
    const {result, setResult} = useContext(ResultContext);

    //This is a useState to force rerender.
    const [count, setCount] = useState(0)

    console.log('This is operator',operator);
    console.log('This is valA', valA);
    console.log('This is valB', valB);
    console.log('This is result', result);

    useEffect(() => {
        // Using this useEffect to achieve some after effects 
        // such as when you have a value under valA, and you have a value under valB and you have an operation that will operate on the two operands, and you press another operator(+,/,*,-)
    
        if(result !== '' && operator !== '') {
            // Just save the result under valA
            setValA(result);
            // Clear the result
            setResult('');
            // set the valB
            setValB('');
        }
    
    }, [operator, count]);
    

    function setOperatorSymbol(symbol) {

        if(valA === '' && Number(valA) === 0) {
            // We set the operator only when valA has a valid number.
            return false;
        } else if(valB !== '' && Number(valB) !== 0) {
            console.log('valB')
            // If valB has a value, and we set an operator, we will call the (run) operation to (do the necessary compilation) and save the result in valA.
            equate();
             

            // Set Operator
            setOperator(symbol);
            // The useEffect is going to handle the rest.
            
            // Then we change count to force a rerender  of component
            setCount(prevVal => prevVal + 1);
            


        } else if(result !== '') {
            // If we already have our result and then we click any operator, all we do is 
            // Save the result under valA,
            // Clear the result
            // Set the operator for the follow up calculation
            // Clear valB

            // Just save the result under valA
            setValA(result);
            // Clear the result
            setResult('');
            //then set operator
            setOperator(symbol);
            // Clear the valB
            setValB(''); 
        } else {
            // If valA has a value, and the setOperatorSymbol is called, we will set the operator immediately.
            setOperator(symbol);
        }
    }

    function setValues(digit) {
        
        if(operator === '') {
            // If operator has not been set, any digit entered will be saved under valA

            // We limit the input values to a max of 9 digits
            if(valA.length !== 9) {
                // We check for the digit(.) to prevent multiple entries of the digit(.)
                if(digit === '.') {
                    valA.includes('.')? null: setValA(valA => valA + digit);
                } else setValA(valA => valA + digit);
            }
        } else if (operator !== '') {
            // If operator has been set, any digit set again will be saved under valB

            // We limit the input values to a max of 9 digits.
            if(valB.length !== 9) {
                // We check for the digit(.) to prevent multiple entries of the digit(.)
                if(digit === '.') {
                    valB.includes('.')? null: setValB(valB => valB + digit);
                } else setValB(valB => valB + digit);
            }
        }
    }

    function equate() {
        // This function is responsible for calling the required operation to be carried out.

        // First we set the previous operator for the Display component to get displayed properly and avoid misleading content
        if(operator !== '=' && operator !== '') {
            setPrevOperator(operator);
            // then we set the operator to the equals to sign
            setOperator('');
        }

        if(operator === '+') {
            setResult(add(valA, valB));
        } else if (operator === '-') {
            setResult(subtract(valA, valB));
        } else if (operator === '/') {
            setResult(divide(valA, valB));
        } else if(operator === '*') {
            setResult(multiplication(valA, valB));
        }
    }

    function reset() {
        // This function is used to clear the variables present
        setValA('');
        setValB('');
        setOperator('');
        setResult('');
    }

    function erase() {
        if(result === '') {
            // This function is used for deleting single characters
            if(operator === '') {
                // if operator is empty, it means we are actively checking valA and we can start erasing from the back once valA is not an empty string
                valA !== '' ? setValA(valA => valA.slice(0, valA.length - 1)): null;
            } else {
                // It means we have started inputting valB and we can then start erasing from the back once valB is not an empty string.
                valB !== '' ? setValB(valB => valB.slice(0, valB.length - 1)): null;
            }
        }
    }

    function keyboardHandler(e) {
        console.log(`This ${e.key}`, 'That',valA)

        if(e.key === '1') {
            setValues('1');
        } else if(e.key === '2') {
            setValues('2');
        } else if(e.key === '3') {
            setValues('3');
        } else if(e.key === '4') {
            setValues('4');
        } else if(e.key === '5') {
            setValues('5');
        } else if(e.key === '6') {
            setValues('6');
        } else if(e.key === '7') {
            setValues('7');
        } else if(e.key === '8') {
            setValues('8');
        } else if(e.key === '9') {
            setValues('9');
        } else if(e.key === '0') {
            setValues('0');
        } else if(e.key === '.') {
            setValues('.')
        } else if (e.key === 'Backspace' || e.key === 'Decimal') {
            // This erases from the input using the hardware provided keyboard
            erase();
        } else if (e.key === '+' || e.key === 'Add') {
            // call the setOperationSymbol which in turn handles the rest
            setOperatorSymbol('+')
        }  else if (e.key === '-' || e.key === 'Subtract') {
            //call the setOperationSymbol which sets the minus symbol
            setOperatorSymbol('-')
        }  else if (e.key === '/' || e.key === 'Divide') {
            //call the setOperationSymbol which sets the divide symbol
            setOperatorSymbol('/'); 
        }  else if (e.key === '*' || e.key === 'Multiply') {
            // Call the setOperationSymbol which sets the multiply symbol
            setOperatorSymbol('*');
        } else if(e.key === 'Enter') {
            // Call the equate function to equate and run the required operation
            equate();
        }
    
    }

    // UseEffect to handle the dynamic input from keyboard 
    useEffect(() => {

        const handleKeyDown = (e) => keyboardHandler(e);

        // Enter digit 1
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [valA,valB, operator])






    const modeStyle = mode === 'light'? 'operations': 'operationsDark';
    const metaBtn = mode === 'light'? 'metaLightBtn': 'metaDarkBtn';
    const numberBtn = mode === 'light'? 'bg-white/30 text-[#339DFF] active:bg-white/50': 'bg-white/30 text-white active:bg-white/50';

    

    return (
        <div className="w-full">

            <div className="buttonContainer mx-auto w-fit py-10 px-5 grid grid-cols-[45px_45px_45px_45px] grid-rows-[45px_45px_45px_45px_45px] sm:grid-cols-[45px_45px_45px_45px_45px] sm:grid-rows-[45px_45px_45px_45px] gap-5 sm:gap-4 justify-center content-center">
                {/* The total clear button */}
                <button 
                className={`poppins-black ${metaBtn} bg-white/80   p-3 sm:col-span-2`}
                onClick={() => {
                        // Setting the clear animation on the display in motion.
                        if(!clear) {
                            // Run the function to reset the calculator
                            reset();

                            setClear(clear => !clear);

                            setTimeout(() => {
                                // Hide the clear animation after 100ms
                                setClear(false);
                            }, 1000);
                        }
                    }
                }
                >
                    C
                </button>

                {/* The clean pencil button */}
                <button 
                    className={`poppins-black sm:col-span-1 ${metaBtn}`}
                    onClick={erase}
                >
                    <i className="fa-sharp fa-regular fa-delete-left"></i>
                </button>

                {/* The divide button */}
                <button 
                    className={`operations ${modeStyle}`}
                    onClick={() => {
                        // On click we set the operator symbol only if valA has been set.
                        setOperatorSymbol('/');
                    }}    
                >
                    <i className="fa-solid fa-slash-forward"></i>
                </button>
                
                {/* The multiply button */}
                <button 
                    className={`operations sm:col-start-5 sm:col-span-1 sm:row-start-1 sm:row-span-1 ${modeStyle}`}
                    onClick={() => {
                        setOperatorSymbol('*')
                    }}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* The number 7 button */}
                <button 
                    className={`sm:col-start-2 number ${numberBtn}`}
                    onClick={() => {
                        setValues('7')
                    }}
                >
                    7
                </button>

                {/* The number 8 button */}
                <button 
                    className={`sm:col-start-3 number ${numberBtn}`}
                    onClick={() => {
                        
                        setValues('8');
                    }}
                >
                    8
                </button>

                {/* The number 9 button */}
                <button 
                    className={`sm:col-start-4 number ${numberBtn}`}
                    onClick={() => {
                        setValues('9');
                    }}
                >
                    9
                </button>

                {/* The subtract button */}
                <button 
                    className={`operations sm:col-start-5 sm:col-span-1 sm:row-start-2 sm:row-span-1 ${modeStyle}`}
                    onClick={() => {
                        setOperatorSymbol('-')
                    }}    
                >
                    <i className="fa-solid fa-minus"></i>
                </button>

                {/* The number 4 button */}
                <button 
                    className={`sm:col-start-3 number ${numberBtn}`}
                    onClick={() => {
                        setValues('4');
                    }}
                >
                    4
                </button>

                {/* The number 5 button */}
                <button 
                    className={`sm:col-start-4 number ${numberBtn}`}
                    onClick={() => {
                        setValues('5');
                    }}
                >
                    5
                </button>

                {/* The number 6 button */}
                <button 
                    className={`sm:row-start-2 number ${numberBtn}`}
                    onClick={() => {
                        setValues('6');
                    }}
                >
                    6
                </button>

                {/* The Addition button */}
                <button 
                    className={`operations sm:col-start-5 sm:col-span-1 sm:row-start-3 sm:row-span-1 ${modeStyle}`}
                    onClick={() => {
                        setOperatorSymbol('+')
                    }}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>

                {/* The number 1 button */}
                <button 
                    className={`number ${numberBtn}`}
                    onClick={() => {
                        setValues('1');
                    }}
                >
                    1
                </button>

                {/* The number 2 button */}
                <button 
                    className={`sm:col-start-1 sm:row-start-3 number ${numberBtn}`}
                    onClick={() => {
                        setValues('2');
                    }}    
                >
                    2
                </button>

                {/* The number 3 button */}
                <button 
                    className={`sm:col-start-2 sm:row-start-3 number ${numberBtn}`}
                    onClick={() => {
                        setValues('3');
                    }}
                >
                    3
                </button>

                {/* The equals button */}
                <button 
                    className={`row-span-2 sm:col-start-4 text-white sm:col-span-2 sm:row-start-4 sm:row-span-1 ${mode === 'light'? 'bg-[#19ACFF]': 'bg-[#1991FF]'}`}
                    onClick={equate}
                >
                    <i className="fa-solid fa-equals"></i>
                </button>

                {/* The number 0 button */}
                <button 
                    className={`col-span-2 sm:col-span-1 sm:col-start-2 number ${numberBtn}`}
                    onClick={() => {
                        setValues('0');
                    }}
                >
                    0
                </button>

                {/* The . button */}
                <button 
                    className={`number font-black ${numberBtn}`}
                    onClick={() => {
                        setValues('.');
                    }}    
                >
                    {/* . */}
                    <i className="fa-solid fa-period"></i>
                </button>


            </div>
        </div>
    )
}