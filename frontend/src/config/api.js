import axios from 'axios';

// 1. Base Instance create karein
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Apne Django backend ka URL check kar lein
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. REQUEST INTERCEPTOR: Har request se pahle access token add karega
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. RESPONSE INTERCEPTOR: Agar 401 (Unauthorized) error aaye toh token refresh karega
api.interceptors.response.use(
    (response) => response, // Agar response sahi hai toh direct bhej do
    async (error) => {
        const originalRequest = error.config;

        // Agar error 401 hai aur humne abhi tak retry nahi kiya hai
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                try {
                    // Naya access token mangne ki koshish
                    const response = await axios.post('http://127.0.0.1:8000/api/login/refresh/', {
                        refresh: refreshToken,
                    });

                    if (response.status === 200) {
                        // Naya token save karein
                        localStorage.setItem('access', response.data.access);
                        
                        // Original request ko naye token ke sath phir se bhejein
                        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // Agar refresh token bhi expire ho gaya hai toh logout karwa dein
                    console.error("Refresh token expired. Logging out...");
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;