import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';

type WithAuthProps = {
  ComponentToProtect: React.ComponentType<any>;
  requiredRole?: 'admin' | 'user';
};

export default function withAuth({ ComponentToProtect, requiredRole }: WithAuthProps) {
  return function ProtectedRoute(props: any) {
    let navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const setError = useAuthStore((state) => state.setError);

    useEffect(() => {
      if (!user || (requiredRole && user.role !== requiredRole)) {
        setError('No tienes permiso para acceder a esta ruta.');
        navigate('/login');
      }
    }, [user, navigate, requiredRole]);
    
    return user && user.role === requiredRole ? <ComponentToProtect {...props} /> : null;
  };
}
