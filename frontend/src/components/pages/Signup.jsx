import React from 'react'
import { UserRegisterForm } from '../forms/UserRegisterForm';
import bg_signup from "../../assets/bg_signup2.jpg"

export function Signup() {

    return (

        <div className="relative w-full h-screen">
            <>
                <img
                    src={bg_signup}
                    alt="register background"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <UserRegisterForm />
                </div>
            </>
        </div>

    )
}
