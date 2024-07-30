import React from "react"
import { useNavigate } from "react-router-dom"
import api, {setupInterceptors} from "../../utils/api"

const AuthContext = React.createContext()

export default function AuthProvider({children}){
    const [ isAuthenticated, setIsAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    const [token, setToken ] = React.useState(localStorage.getItem('token'))

    const navigate = useNavigate()

    const login = (token) => {
        console.log("You should now be logged in")
        localStorage.setItem('token', token)
        setToken(token)
        setIsAuthenticated(!!localStorage.getItem('token'))
        console.log("state updated this is your login token from state: ", token)   
    }

    const logout = () => {
        console.log("Auth provider logout function ran")
        localStorage.removeItem('token')
        setToken(null)
        setIsAuthenticated(false)
    }

    React.useEffect(() => {
        setupInterceptors(logout, navigate, token)
    }, [logout, token])

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext }

