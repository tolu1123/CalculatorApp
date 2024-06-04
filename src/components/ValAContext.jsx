import React, {createContext} from 'react';

// This is our first value that we will be inputted and saved first before any operator is clicked.
export const ValAContext = createContext({
    valA: '',
    setValA: () => {},
})