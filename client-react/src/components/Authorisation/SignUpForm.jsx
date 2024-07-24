import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { API_URL } from "../../constants"

export default function SignUpForm(){
    
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [message, setMessage ] = React.useState("")
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: data})
            })

            const result = await response.json()

            if(response.ok){
                setMessage("User registered successfully!")
                navigate("/")
                
            } else {
                setMessage(`Error: ${result.error || 'Registration failed'}`)
            }     
        } catch (error) {
            setMessage(`Error: ${error.message || 'Registration failed'}`)
        }
    }
    return(
        <div>
            <h2>Sign Up!</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <label>Username:</label>
                    <input {...register('username', {
                        required: 'Username is required'
                    })}/>
                    {errors.username && <span>{errors.username.message}</span>}
                    <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long.'
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        {...register('password_confirmation', {
                        required: 'Password confirmation is required',
                        validate: (value) =>
                            value === document.querySelector('input[name="password"]').value || 'Passwords do not match'
                        })}
                    />
                    {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}
                </div>
                <button type="submit">Sign Up</button>    
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}