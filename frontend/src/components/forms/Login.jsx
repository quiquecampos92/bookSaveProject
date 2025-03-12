import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Ajusta la ruta según tu estructura
import loginService from "../../services/login";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { login } = useContext(AuthContext); // Obtiene la función `login` del contexto
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // Llama al servicio de inicio de sesión
            const userData = await loginService.login({ username, password });

            // Guarda el usuario y el token en localStorage
            window.localStorage.setItem('loggedUser', JSON.stringify(userData));
            window.localStorage.setItem('loggedUserToken', userData.token);

            // Actualiza el estado de autenticación
            login(userData);

            // Limpia los campos del formulario
            setUsername('');
            setPassword('');

            // Redirige al usuario a la página principal
            navigate('/books');
        } catch (error) {
            // Maneja errores de autenticación
            setErrorMessage('Credenciales incorrectas');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <>
            {/* Muestra un mensaje de error si existe */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}