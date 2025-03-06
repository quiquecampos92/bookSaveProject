// Navbar2.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchTerm } from '../forms/SearchTerm.jsx';
import fullLogo from '../../assets/booksavewhiterow.png';
import { LogoutButton } from "../buttons/LogoutButton.jsx";
import { AuthContext } from "../../AuthContext.jsx"; // Asegúrate de que esto esté correcto

export function Navbar2() {
    const { user, logout } = useContext(AuthContext); // Accede a logout desde el contexto

    const links = [
        { name: 'HOME', path: '/books' },
        { name: 'READ BOOKS', path: '/readbooks' },
        { name: 'BOOKS TO READ', path: '/bookstoread' },
        { name: 'MY BOOKS', path: '/mybooks' },
    ];

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 px-5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/books" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className='flex flex-row justify-start items-center'>
                            <img src={fullLogo} alt="logo booksave" className='w-32 pr-5' />
                            <SearchTerm />
                        </div>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {user === null && (
                            <Link to="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
                                Login
                            </Link>
                        )}
                        {user !== null && <LogoutButton logout={logout} />} {/* Aquí pasas logout */}
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center max-w-screen-xl px-4 py-3 mx-auto">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        {links
                            .filter(link => link.name)
                            .map(link => {
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-900 dark:text-white hover:underline"
                                            aria-current="page"
                                        >
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </nav>
        </>
    );
}
