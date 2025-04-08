import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fullLogo from '../../assets/booksavewhiterow.png';
import usersService from "../../services/users";

export function UserRegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('')
    const [checkPass, setcheckPass] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const checkPasswords = () => {
        if (password !== repeatPassword) {
            setcheckPass(true);
            setErrorMessage('Las contraseñas no coinciden');
            setTimeout(() => {
                setErrorMessage(null);
                setcheckPass(false);
            }, 5000);
            return false;
        }

        setcheckPass(false);
        return true;
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        const isPasswordValid = checkPasswords();
        if (!isPasswordValid) return;

        const userToCreate = {
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            name: name.trim(),
            lastName: lastName.trim(),
            password
        };

        try {
            await usersService.createUser(userToCreate);

            setUsername('');
            setEmail('');
            setName('');
            setLastName('');
            setPassword('');
            setRepeatPassword('');

            navigate('/login');
        } catch (error) {
            setErrorMessage('Algo ha salido mal.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };


    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleSignup} className="flex flex-col justify-center items-center gap-4 bg-green-400 rounded-xl p-10 bg-opacity-50">
                    <img src={fullLogo} alt="logo booksave" className="w-64 mb-16 mt-10" />

                    <div>
                        <input
                            type="text"
                            id="username"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={username}
                            placeholder="Username"
                            onChange={({ target }) => setUsername(target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={email}
                            placeholder="Email"
                            onChange={({ target }) => setEmail(target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="name"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={name}
                            placeholder="Name"
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={lastName}
                            placeholder="Last name"
                            onChange={({ target }) => setLastName(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            className={`bg-green-100 bg-opacity-0 text-black border-b-2 ${checkPass ? "border-red-500" : "border-b-green-500"} placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1`}
                            value={password}
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="repeatPassword"
                            className={`bg-green-100 bg-opacity-0 text-black border-b-2 ${checkPass ? "border-red-500" : "border-b-green-500"} placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1`}
                            value={repeatPassword}
                            placeholder="Repeat Password"
                            onChange={({ target }) => setRepeatPassword(target.value)}
                        />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button type="submit" className="bg-green-600 border-2 border-green-600 rounded-xl text-white py-2 px-7 mt-5 hover:bg-green-500">Sign up</button>
                </form>
            </div>
        </>
    )
}
