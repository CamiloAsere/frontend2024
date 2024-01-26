import { ReactNode } from "react";
interface ButtonProps {
  color: string;
  onClick: () => void;
  children: ReactNode; // Agrega esta línea
}

const Button: React.FC<ButtonProps> = ({ color, children, onClick }) => {
  const styles = {
    button: {
      display:'flex',
      backgroundColor: color,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 17px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '5rem',  // Establece un ancho mínimo para el botón
    },
  }

  return (
    <button style={styles.button} onClick={onClick}>{children}</button>
  );
}

export default Button;
