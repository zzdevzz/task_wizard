import axios from 'axios'
import { API_URL, BASE_URL } from '../constants'

console.log("build file running successfully")

console.log('BASE_URL: ', BASE_URL)
console.log('API_URL: ', API_URL)

const api = axios.create({
  baseURL: API_URL
})

const base = axios.create({
  baseURL: BASE_URL
})

// We can't use React Hooks (usecontext) in a non-react component, so no way to pass logout function.
// Instead we call this function to set up axios in a file where all the variables live. Called in Auth Provider component.

// !! Its possible to set headers on every  request with interceptors. But this gave issues with JWT expiring. Interceptors were using old values, with and without react!!

const setupInterceptors = (logout, navigate) => {

  const token = localStorage.token

  // This checks every response we get back and ensures its not an error.
  api.interceptors.response.use(
      (response) => response, // On successful response, just return the response
      (error) => {
        // Check if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          // console.log("token on 401 axios: ", token)
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


export { api, base, setupInterceptors, clearInterceptors }
