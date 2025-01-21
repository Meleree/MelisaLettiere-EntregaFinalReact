import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../db/db"; 
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }
  
    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("El correo electrónico es inválido.");
        return;
      }
  
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login exitoso!");
      navigate("/home");  
    } catch (error) {
      setError("Error de login: " + error.message);
      console.log("Error de login: ", error.message);
    }
  };
  
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
