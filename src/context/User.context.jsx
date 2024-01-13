import { createContext, useState } from "react";

const userContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState("")
    const [qArray, setArrayData] = useState([])

    const value = {
        user,
        setUser,
        qArray,
        setArrayData
    }

    return <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
}


export {
    userContext,
    UserProvider
}