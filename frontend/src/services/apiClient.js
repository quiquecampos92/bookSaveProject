import axios from "axios";

const baseURL = import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCA
    : import.meta.env.VITE_API_URL;

const apiClient = axios.create({ baseURL });

// Interceptor de solicitud: Agrega el token al encabezado
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("loggedUserToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta: Maneja errores de autenticación
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Limpia el localStorage y redirige al login
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("loggedUserToken");
            window.location.href = "/login"; // Redirige al login
        }
        return Promise.reject(error);
    }
);

export default apiClient;