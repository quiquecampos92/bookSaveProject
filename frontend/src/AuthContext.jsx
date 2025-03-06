import { createContext, useState, useEffect } from "react";
import bookService from "../src/services/books";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setUser(loggedUser);
            bookService.setToken(loggedUser.token);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setUser(userData);
        bookService.setToken(userData.token);
    };

    const logout = () => {
        localStorage.removeItem("loggedUser");
        setUser(null);
        bookService.setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
