import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/meleree.webp"; 
import CartWidget from "./CartWidget";
import { auth } from "../../db/db.js";  
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./navbar.css";

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="categories">
        <Link to="/category/abrigos" className="category">ABRIGOS</Link>
        <Link to="/category/remeras" className="category">REMERAS</Link>
        <Link to="/category/accesorios" className="category">ACCESORIOS</Link>
      </ul>

      <Link to="/" className="brand primary-font-color">
        <img src={logo} alt="Logo de Melere" className="logo-brand" />
      </Link>

      <div className="auth-links">
        {user ? (
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        ) : (
          <>
            <Link to="/login" className="login-button">INICIAR SESION</Link>
            <Link to="/register" className="register-button">REGISTRARSE</Link>
          </>
        )}
      </div>

      <CartWidget />
    </nav>
  );
};

export default NavBar;
