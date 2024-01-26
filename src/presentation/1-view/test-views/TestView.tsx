import { useAuthStore } from "../../../store/store";
import Pokemon from "../pages/Pokemon";

const MyComponent: React.FC = () => {
  const styles ={color:'orange'}
  const user = useAuthStore((state) => state.user);


  return (
    <div>
        <p style={styles}>Todos los usuarios pueden ver esto.</p>

{user && (
  <p style={styles}>Sólo los usuarios autenticados pueden ver esto.</p>
)}

{user && user.role === 'admin' && (
  <p style={styles}>Sólo los administradores pueden ver esto.</p>
)}
      <Pokemon/>
    </div>
  );
};

export default MyComponent;
