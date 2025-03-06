// LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton({ logout }) {  // Cambié setUser a logout
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función logout proporcionada por el contexto
        navigate("/login"); // Redirige al login
        window.localStorage.removeItem("loggedUser"); // Elimina el usuario del local storage
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
            Logout
        </button>
    );
}
