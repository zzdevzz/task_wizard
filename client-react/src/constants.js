// EVERYTHING IN THIS FILE NEEDS TO BE THE BACKEND PORT (3000) OR PRODUCTION URL. ALL ADDRSSED TO BE FROM WINDOWS IPCONFIG.
// THIS IS IPCONFIG FROM WINDOWS.

const dynamicIp = "http://192.168.1.172:3000"

export const API_URL = process.env.NODE_ENV === "production"
? import.meta.env.VITE_API_URL
// : "http://172.30.50.53:3000/api/v1"
: `${dynamicIp}/api/v1`

export const BASE_URL = process.env.NODE_ENV === "production"
? import.meta.env.VITE_BASE_URL
// : "http://172.30.50.53:3000"
: dynamicIp


// const API_URL = import.meta.env.VITE_API_URL


// const BASE_URL = import.meta.env.VITE_BASE_URL


