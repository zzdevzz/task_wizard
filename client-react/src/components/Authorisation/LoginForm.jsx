import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { AuthContext } from "./AuthProvider"
import api from "../../utils/api"
import { API_URL } from "../../constants"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = React.useState('')
    const navigate = useNavigate()
    const {login} = React.useContext(AuthContext)
  
    const onSubmit = async (data) => {
      console.log("login form function initated")
      try {
        
        // axios can't use API axios instance since causing too much errors with react and JWT.
        // JWT is sent in headers (not body) under Authorization for protection.

        const response = await api.post(`http://localhost:3000/login`, {user: data})
        const token = response.headers['authorization']
        if (token){
          login(token)
          navigate('/tasks')
        } else {
          setError('Login failed')
        }
      } catch (err) {
        setError('An error occurred. Please try again.')
      }
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    );
  }