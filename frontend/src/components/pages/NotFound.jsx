import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/books">Volver al inicio</Link>
    </div>
  );
}
