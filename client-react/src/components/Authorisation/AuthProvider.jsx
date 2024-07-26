import React from "react"

const AuthContext = React.createContext()

export default function AuthProvider({children}){
    const [ isAuthenticated, setIsAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    const [token, setToken ] = React.useState(localStorage.getItem('token'))

    const login = (token) => {
        localStorage.setItem('token', token)
        setToken(token)
        setIsAuthenticated(!!localStorage.getItem('token'))    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext }
