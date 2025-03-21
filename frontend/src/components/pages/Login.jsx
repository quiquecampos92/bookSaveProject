import React, { useState, useEffect } from "react";
import { LoginForm } from "../forms/LoginForm";
import bgimage from "../../assets/bg_login.webp";

export function Login() {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = bgimage;
        img.onload = () => {
            setTimeout(() => {
                setImageLoaded(true);
            }, 100);
        };
    }, []);

    return (
        <div className="relative w-full h-screen">
            {imageLoaded && (
                <>
                    <img
                        src={bgimage}
                        alt="login background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <LoginForm />
                    </div>
                </>
            )}
        </div>
    );
}
