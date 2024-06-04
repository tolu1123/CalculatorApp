import React, {createContext} from 'react'


export const ModeContext = createContext({
    mode: 'light',
    setMode: () => {}
})