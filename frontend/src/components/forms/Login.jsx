import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import loginService from "../../services/login";

export function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginService.login(credentials);
            login(userData);
            navigate("/books");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="block border p-2 w-full mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="block border p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
