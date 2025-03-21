import React, { useContext } from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/Home";
import { ReadBooks } from "./components/pages/ReadBooks";
import { BooksToRead } from "./components/pages/BooksToRead";
import { MyBooks } from "./components/pages/MyBooks";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { AuthProvider, AuthContext } from "./AuthContext";
import { PrivateRoute } from "./PrivateRoute";

function AppRoutes() {
  const { user } = useContext(AuthContext); // Ahora dentro del contexto correcto

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/books" />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <Navigate to="/books" />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/books" element={
        <PrivateRoute>
          <Layout>
            <Home />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/readbooks" element={
        <PrivateRoute>
          <Layout>
            <ReadBooks />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/bookstoread" element={
        <PrivateRoute>
          <Layout>
            <BooksToRead />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/mybooks" element={
        <PrivateRoute>
          <Layout>
            <MyBooks />
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
