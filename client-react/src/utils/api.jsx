import axios from 'axios'
import { API_URL } from '../constants'

const api = axios.create({
    baseURL: API_URL
})

// We can't use React Hooks (usecontext) in a non-react component, so no way to pass logout function.
// Instead we call this function to set up axios in a file where all the variables live. Called in Auth Provider component.

const setupInterceptors = (logout, navigate) => {

  const token = localStorage.getItem('token')
  // console.log(token)
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = token
      }
      console.log("token in use: ", token)
      return config
    }, (error) => {
      return Promise.reject(error)
    }
  )

  // This checks every response we get back and ensures its not an error.
  api.interceptors.response.use(
      (response) => response, // On successful response, just return the response
      (error) => {
        // Check if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          console.log("token on 401 axios: ", token)
          // Log the user out
          logout()
          // Redirect to the login page
          navigate('/login');
        }
        
        return Promise.reject(error); // Reject the promise with the error
      }
    )
}

const clearInterceptors = () => {
  console.log("Clearup ran")
  api.interceptors.request.eject()
  api.interceptors.response.eject()
}

export default api
export { setupInterceptors, clearInterceptors }
