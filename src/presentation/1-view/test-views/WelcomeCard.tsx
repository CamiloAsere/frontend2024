// WelcomeCard.tsx
import React, { useEffect, useState } from 'react';
import './userslist.css';

type Props = {
    name:string;
    role:string;
};

const WelcomeCard: React.FC<Props> = ({ name, role }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true); // Muestra la tarjeta de bienvenida después de 1 segundo
    }, 1000);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <div className={`welcome-card ${show ? 'show' : ''}`}>
      <h3>Bienvenido/a, {name}!</h3>
      <p>Esperamos que disfrutes de tu visita a nuestra página.</p>
    </div>
  );
};

export default WelcomeCard;
