import React,{createContext} from 'react';


export const ClearContext = createContext({
    clear: false,
    setClear: () => {},
})