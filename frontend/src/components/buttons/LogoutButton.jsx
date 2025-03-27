// LogoutButton.jsx
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
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
            className="flex flex-row items-center gap-2 bg-none sm:bg-orange-500 text-orange-500 sm:text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-slate-200 transition"
        >
            <IoLogOutOutline className="w-12 h-12 sm:w-5 sm:h-5 text-orange-500 bg-white sm:bg-orange-500 sm:text-white" />
            <span className="sm:block hidden">Logout</span>
        </button>
    );
}
