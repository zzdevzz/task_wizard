import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { AuthContext } from "./AuthProvider"
import { base } from "../../utils/api"
import { BASE_URL, API_URL } from "../../constants"

import { useDocumentTitle } from "../customHook/useDocumentTitle"

export default function LoginForm({className=""}) {

    useDocumentTitle("Login")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = React.useState('')
    const navigate = useNavigate()
    const {login} = React.useContext(AuthContext)

    const onSubmit = async (data) => {
      console.log("login form function initated test!!!")
      console.log("BASE URL FROM LOGIN FORM INPUT: ")
      console.log(BASE_URL)
      console.log("API URL FROM LOGIN FORM INPUT: ")
      console.log(API_URL)
      try {

        // axios can't use API axios instance since causing too much errors with react and JWT.
        // JWT is sent in headers (not body) under Authorization for protection.

        const response = await base.post(`/login`, {user: data})
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
      <div className="cover-image h-100 d-flex justify-content-center flex-column">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className={`glass-form ${className}`}>
            <h1> Login</h1>
            <div className="">
              {/* <label className="form-label">Email:</label> */}
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
              {/* <label>Password:</label> */}
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                {...register('password', { required: 'Password is required' })}
                />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button type="submit" className="base-button-purple">Sign In</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    )
  }
