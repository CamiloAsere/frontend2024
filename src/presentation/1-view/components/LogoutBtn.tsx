// LogoutButton.tsx
import { useAuthStore } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import Button from './Btn';

export default function LogoutButton() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      signOut();
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después de cerrar la sesión
    }
  };

  const handleLogin = () => {
    if (!user) {
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    }
  };

  return (
    <Button 
    color={user ?  "#dc3545": "#28a745" } 
    onClick={user ? handleLogout : handleLogin}>
    {user ? 'Logout' : 'Login'}
    </Button>
  );
}
