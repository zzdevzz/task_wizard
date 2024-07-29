import React from "react"

const AuthContext = React.createContext()

export default function AuthProvider({children}){
    const [ isAuthenticated, setIsAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    const [token, setToken ] = React.useState(localStorage.getItem('token'))

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setToken(accessToken)
        setIsAuthenticated(!!localStorage.getItem('token'))    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setToken(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext }
