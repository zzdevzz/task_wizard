import axios from 'axios'
import { API_URL } from './constants'

// import React from 'react'
import { useNavigate } from 'react-router-dom'

// const navigate = useNavigate()

const api = axios.create({
    baseURL: API_URL
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token){
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  
  (response) => response, // On successful response, just return the response.
  async(error) => {
    const originalRequest = error.config; // Store the original request configuration
    
    // Check if the error is a 401 (Unauthorized) and if the request has not already been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set a retry flag to prevent infinite loops
      
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        // Make a request to refresh the access token using the refresh token
        const response = await axios.post(`${API_URL}/refresh`, { token: refreshToken })
        
        // Store the new access token in local storage
        localStorage.setItem('accessToken', response.data.accessToken)
        
        // Update the default Authorization header in Axios with the new access token
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        
        // Update the Authorization header of the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
        
        // Retry the original request with the new access token
        return api(originalRequest)
      } catch (err) {
        // If refreshing the token fails, remove tokens from local storage to log the user out
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        
        // Redirect the user to the login page
        // window.location.href = '/login';
        // navigate("/")
        
        // Reject the promise with the error
        return Promise.reject(err)
      }
    }
    
    // If the error is not a 401 or the request has already been retried, reject the promise with the error
    return Promise.reject(error)
  }
)
export default api