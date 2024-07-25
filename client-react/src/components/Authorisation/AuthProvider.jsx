import React, { Children } from "react"

const AuthContext = React.createContext()

export default function AuthProvider({children}){
    const [ isAuthenticated, setIsAuthenticated ] = React.useState(!!localStorage.getItem('token'))

    const login = (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(!!localStorage.getItem('token'))
    }

    const logout = (token) => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }
