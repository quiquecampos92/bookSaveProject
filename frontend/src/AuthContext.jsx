import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Importación correcta

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const loggedUserToken = localStorage.getItem("loggedUserToken");

        if (loggedUser && loggedUserToken) {
            // Verifica si el token ha expirado
            const isTokenExpired = isTokenExpiredFunc(loggedUserToken);
            if (isTokenExpired) {
                // Si el token ha expirado, limpiar localStorage y redirigir
                localStorage.removeItem("loggedUser");
                localStorage.removeItem("loggedUserToken");
                window.location.href = "/login";
            } else {
                // Si el token es válido, establecer el usuario
                setUser(loggedUser);
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        localStorage.setItem("loggedUserToken", userData.token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedUserToken");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {loading ? <div>Cargando...</div> : children}
        </AuthContext.Provider>
    );
}

// Función para verificar si el token ha expirado
function isTokenExpiredFunc(token) {
    try {
        const decoded = jwtDecode(token); // Decodifica el token
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        return decoded.exp < currentTime; // Retorna true si el token ha expirado
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return true; // Asume que el token es inválido si hay un error
    }
}