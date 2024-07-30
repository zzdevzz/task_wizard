import axios from 'axios'
import { API_URL } from '../constants'

const api = axios.create({
    baseURL: API_URL
})

// We can't use React Hooks (usecontext) in a non-react component, so no way to pass logout function.
// Instead we call this function to set up axios in a file where all the variables live. Called in Auth Provider component.

const setupInterceptors = (logout, navigate) => {

  api.interceptors.response.use(
      (response) => response, // On successful response, just return the response
      (error) => {
        // Check if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          console.log("This is running, 401 axios")
          // Log the user out
          logout()
          // Redirect to the login page
          navigate('/login');
        }
        
        return Promise.reject(error); // Reject the promise with the error
      }
    )
}

export default api
export { setupInterceptors }
