import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fullLogo from '../../assets/booksavewhiterow.png';
import usersService from "../../services/users";

export function UserRegisterForm() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            await usersService.createUser({ username, name, lastName, password });

            setUsername('');
            setName('')
            setLastName('')
            setPassword('');
            setRepeatPassword('')

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
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={password}
                            placeholder="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="repeatPassword"
                            className="bg-green-100 bg-opacity-0 text-black border-b-2 border-b-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1"
                            value={repeatPassword}
                            placeholder="Repeat Password"
                            onChange={({ target }) => setRepeatPassword(target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-green-600 border-2 border-green-600 rounded-xl text-white py-2 px-7 mt-5 hover:bg-green-500">Sign up</button>
                </form>
            </div>
        </>
    )
}
