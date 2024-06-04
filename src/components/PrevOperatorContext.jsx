import React, {createContext} from 'react';

export const PrevOperatorContext = createContext({
    prevOperator: '',
    setPrevOperator: () => {}
})