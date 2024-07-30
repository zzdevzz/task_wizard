import axios from 'axios'
import { API_URL } from '../constants'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Authorisation/AuthProvider';

const api = axios.create({
    baseURL: API_URL
})

api.interceptors.response.use(
    (response) => response, // On successful response, just return the response
    (error) => {
      const { logout } = React.useContext(AuthContext);
      const navigate = useNavigate();
      
      console.log(error.response)
      // Check if the error status is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Log the user out
        logout()
        // Redirect to the login page
        navigate('/login');
      }
      
      return Promise.reject(error); // Reject the promise with the error
    }
  );

export default api
