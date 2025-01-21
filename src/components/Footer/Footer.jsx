import React from 'react';
import './styles/Footer.css'; 
import whatsappLogo from '../../../src/assets/whatsapp.png';  
import mailLogo from '../../../src/assets/mail.png';  

const Footer = () => {
  return (
    <footer className="footerStyle">
      <div className="socialLinksStyle">
        <a href="https://wa.me/1166601557" target="_blank" rel="noopener noreferrer" className="linkStyle">
          <img src={whatsappLogo} alt="WhatsApp" className="iconStyle" />
        </a>

        <a href="mailto:email@example.com" target="_blank" rel="noopener noreferrer" className="linkStyle">
          <img src={mailLogo} alt="Email" className="iconStyle" />
        </a>
      </div>
      <p>
        <a href="https://console.firebase.google.com/project/ecommerce-melere/overview?hl=es-419" target="_blank" rel="noopener noreferrer">
          FIREBASE
        </a>
      </p>  
      
      <p className="copyrightStyle">© 2024 Melere. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
