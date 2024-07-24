import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = React.useState('')
    const navigate = useNavigate()
  
    const onSubmit = async (data) => {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: data }),
        })
        const result = await response.json()
  
        if (response.ok) {
          localStorage.setItem('token', result.jwt) // Store the JWT token
          navigate('/tasks'); // Redirect to tasks
        } else {
          setError(result.error || 'Login failed')
        }
      } catch (err) {
        setError('An error occurred. Please try again.')
      }
    };
  
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