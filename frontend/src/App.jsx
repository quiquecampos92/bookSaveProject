import React from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from "react-router-dom";
import { Home } from "./components/pages/Home";
import { ReadBooks } from "./components/pages/ReadBooks";
import { BooksToRead } from "./components/pages/BooksToRead";
import { MyBooks } from "./components/pages/MyBooks";
import { Navbar2 } from "./components/layout/Navbar2";
import { Login } from "./components/forms/Login";
import { AuthProvider } from "./AuthContext";
import { PrivateRoute } from "./PrivateRoute";

export function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/readbooks" element={<PrivateRoute><ReadBooks /></PrivateRoute>} />
          <Route path="/bookstoread" element={<PrivateRoute><BooksToRead /></PrivateRoute>} />
          <Route path="/mybooks" element={<PrivateRoute><MyBooks /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
