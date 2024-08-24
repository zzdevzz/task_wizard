import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { base } from "../../utils/api"
import { AuthContext } from "./AuthProvider"
import { BASE_URL } from "../../constants"




export default function SignUpForm({className=""}){

  const {register, handleSubmit, formState: {errors}} = useForm()
  const [message, setMessage ] = React.useState("")
  const navigate = useNavigate()
  const {login} = React.useContext(AuthContext)

    console.log("BASE URL IN SIGNUP FORM: ", BASE_URL )
    const onSubmit = async (data) => {
        try {
            const response = await base.post(`/signup`, {user: data})
            const token = response.headers['authorization']
            setMessage("User registered successfully!")
            login(token)
            navigate("/tasks")
        } catch (error) {
            setMessage(`Error: ${error.message || 'Registration failed'}`)
        }
    }
    return(
        <div className="cover-image h-100 d-flex justify-content-center flex-column">
            <form className="glass-form container" onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign Up</h1>
                <div>
                    {/* <label>Email:</label> */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        {/* <label>Username:</label> */}
                        <input
                            placeholder="Username"
                            className="form-control"     
                            {...register('username', {
                                required: 'Username is required'
                            })}/>
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div>
                    {/* <label>Password:</label> */}
                    <input
                        type="Password"
                        placeholder="Password"
                        className="form-control"
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
                    {/* <label>Confirm Password:</label> */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        {...register('password_confirmation', {
                        required: 'Password confirmation is required',
                        validate: (value) =>
                            value === document.querySelector('input[name="password"]').value || 'Passwords do not match'
                        })}
                    />
                    {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}
                </div>
                <button type="submit" className="base-button-purple">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
