// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json", // Set default headers
    },
    withCredentials: true,
});



export default api