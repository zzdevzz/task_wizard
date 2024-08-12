export const API_URL = process.env.NODE_ENV === "production"
  ? import.meta.env.VITE_API_URL
  : "http://192.168.1.143:3000/api/v1"
  // : "http://localhost:3000/api/v1"

export const BASE_URL = process.env.NODE_ENV === "production"
  ? import.meta.env.VITE_BASE_URL
  : "http://192.168.1.143:3000"
  // : "http://localhost:3000/"
