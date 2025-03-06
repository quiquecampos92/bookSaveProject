import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    return user ? children : <Navigate to="/login" />;
}
