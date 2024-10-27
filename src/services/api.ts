// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-Type": "application/json", // Set default headers
    },
    withCredentials: true
});


export default api