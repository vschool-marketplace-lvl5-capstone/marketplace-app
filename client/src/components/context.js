import React, { useState } from 'react'

const Context = React.createContext()

function ContextProvider(props) {
    // state for posting list
    const [postingList, setPostingList] = useState([])

    return(
        <Context.Provider value={{postingList, setPostingList}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}