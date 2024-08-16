// EVERYTHING IN THIS FILE NEEDS TO BE THE BACKEND PORT (3000) OR PRODUCTION URL. ALL ADDRSSED TO BE FROM WINDOWS IPCONFIG.
// THIS IS IPCONFIG FROM WSL.

const dynamicIp = "http://172.30.169.106:3000"

export const API_URL = process.env.NODE_ENV === "production"
  ? import.meta.env.VITE_API_URL
  // : "http://172.17.254.36:3000/api/v1"
  : `${dynamicIp}/api/v1`
//   : "http://172.27.52.187:3000/api/v1"
  // : "http://localhost:3000/api/v1"

export const BASE_URL = process.env.NODE_ENV === "production"
  ? import.meta.env.VITE_BASE_URL
  // : "http://172.17.254.36:3000"
  : `${dynamicIp}`
//   : "http://172.27.52.187:3000"
  // : "http://localhost:3000/"

// const API_URL = import.meta.env.VITE_API_URL


// const BASE_URL = import.meta.env.VITE_BASE_URL


