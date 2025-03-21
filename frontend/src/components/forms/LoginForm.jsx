import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Ajusta la ruta según tu estructura
import loginService from "../../services/login";
import fullLogo from '../../assets/booksavewhiterow.png';

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { login } = useContext(AuthContext);
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
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-4 bg-green-200 rounded-xl p-10 bg-opacity-40">
                    <img src={fullLogo} alt="logo booksave" className="w-64 mb-16 mt-10" />

                    <div>
                        <input
                            type="text"
                            id="username"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={username}
                            placeholder="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={password}
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-green-600 border-2 border-green-600 rounded-xl text-white py-2 px-7 mt-3 hover:bg-green-500">Login</button>
                    <div className="flex flex-col items-center md:flex-row md:justify-center">
                        <h3>New in Booksave?</h3>
                        <Link to="/register" className="hover:underline text-green-500 font-bold py-2 px-2">
                            Sign up
                        </Link>
                    </div>

                </form>
            </div>
        </>
    );
}
