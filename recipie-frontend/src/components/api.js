import axios from 'axios';

const api = axios.create({
    baseURL: 'https://photo-mania-backend.vercel.app/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
});

export default api;