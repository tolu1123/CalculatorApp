import React, {createContext} from 'react';

// This is our SECOND value that we will be inputted and saved after any operator is clicked.
export const ValBContext = createContext({
    valB: '',
    setValB: () => {},
})