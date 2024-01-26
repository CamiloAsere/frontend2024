// ErrorMessage.tsx
import { useAuthStore } from '../../../store/store';

export default function ErrorMessage() {
  const errorMessage = useAuthStore((state) => state.errorMessage);

  if (!errorMessage) {
    return null;
  }

  return (
    <div style={{
      color: 'red',
      position: 'fixed', // Hace que el div sea flotante
      top: '10px', // Posición desde la parte superior de la página
      left: '10px', // Posición desde la izquierda de la página
      zIndex: 1000, // Asegura que el mensaje esté por encima de otros elementos
    }}>
      {errorMessage}
    </div>
  );
}
