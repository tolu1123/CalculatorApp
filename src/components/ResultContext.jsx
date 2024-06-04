import React,{createContext} from "react";

export const ResultContext = createContext({
    result: '',
    setResult: () => {}
})