// Usamos el hook de Zustand en el componente que muestra la información según el rol

import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const Info = () => {
  // Obtenemos el rol, el token, el error y las funciones de login y logout del estado
  const { role, token, error, login, logout } = useAuthStore();

  // Simulamos un token de acceso
  const validToken = '123456';

  // Simulamos una función para validar el token
  const validateToken = (token: string) => {
    // Comparamos el token con el token válido
    return token === validToken;
  };


   // Usamos un efecto para comprobar el token cada vez que se renderiza el componente
   useEffect(() => {
    // Si el token no es válido
    if (!validateToken(token)) {
      // Actualizamos el estado con un mensaje de error
      useAuthStore.setState({ error: 'Su sesión ha expirado. Por favor, inicie sesión de nuevo.' });
      // Borramos el estado del almacenamiento
      localStorage.removeItem('authState');
    }
  }, [token]);

  // Renderizamos el componente según el rol y el error
  return (
    <div>
      {error ? (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      ) : role === 'admin' ? (
        <div>
          <h1>Información para administradores</h1>
          <p>Esta es la información confidencial para los administradores.</p>
          <button onClick={() => logout()}>Cerrar sesión</button>
        </div>
      ) : role === 'user' ? (
        <div>
          <h1>Información para usuarios</h1>
          <p>Esta es la información pública para los usuarios.</p>
          <button onClick={() => logout()}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h1>Información para invitados</h1>
          <p>Esta es la información genérica para los invitados.</p>
          <button onClick={() => login('admin', validToken)}>Iniciar sesión como administrador</button>
          <button onClick={() => login('user', validToken)}>Iniciar sesión como usuario</button>
        </div>
      )}
    </div>
  );
};

export default Info;

// Explicación del código:

// - El código es el mismo que el anterior, solo que se añade un campo de error al estado, y se usa un efecto para validar el token cada vez que se renderiza el componente.
// - Si el token no es válido, se actualiza el estado con un mensaje de error, y se borra el estado del almacenamiento.
// - Si hay un error, se muestra un mensaje al usuario, y se le pide que inicie sesión de nuevo.