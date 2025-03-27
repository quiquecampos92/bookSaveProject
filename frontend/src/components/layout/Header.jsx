import React, { useContext } from 'react'
import { AuthContext } from "../../AuthContext.jsx";
import { SearchTerm } from '../forms/SearchTerm.jsx';
import greenfullLogo from '../../assets/booksavegreenrow.png';
import greenSmallLogo from '../../assets/booksavegreensmall.png';

import { LogoutButton } from "../buttons/LogoutButton.jsx";
import { Link } from 'react-router-dom';

export function Header({ onSearch }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className={`flex justify-between items-center p-4`}>
            <Link to="/books">
                <img src={greenSmallLogo} alt="small logo booksave" className="block sm:hidden w-10" />
                <img src={greenfullLogo} alt="logo booksave" className="hidden sm:block w-32 sm:w-40" />
            </Link>
            <SearchTerm onSearch={onSearch} />
            <LogoutButton logout={logout} />
        </div>
    )
}
