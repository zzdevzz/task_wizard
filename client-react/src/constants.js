export const API_URL = process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000/api/v1"
