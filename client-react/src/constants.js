export const API_URL = process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000/api/v1"

export const BASE_URL = process.env.NODE_ENV === "production"
  ? import.meta.env.BASE_URL
  : "http://localhost:3000/"
