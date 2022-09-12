import React, { useState, createContext} from 'react';

export const userContext = createContext(null)

export const DataProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('')
    return(
        <userContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </userContext.Provider>
    )
}