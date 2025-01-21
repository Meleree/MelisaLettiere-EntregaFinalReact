import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; 

function NotFoundPage() {
  const navigate = useNavigate();  

  const handleGoBack = () => {
    navigate(-1);  
  };

  return (
    <div className="not-found-container">
      <h1>Producto no encontrado</h1>
      <p>El producto que buscas no existe.</p>
      <button className="button-detail" onClick={handleGoBack}>Volver atrás</button>
    </div>
  );
}

export default NotFoundPage;
