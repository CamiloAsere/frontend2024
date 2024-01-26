// Navbar.tsx
/*
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutBtn'
import styles from '../assets/Navbar.module.css'



export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link className={styles.link} to='/'>Home</Link></li>
        <li><Link className={styles.link} to='/admin'>Admin</Link></li>
        <li><Link className={styles.link} to='/protected'>User</Link></li>
        <li><Link className={styles.link} to='/api'>Test</Link></li>
        <li className={styles.logoutButton}><LogoutButton/></li>
      </ul>
    </nav>
  )
}
*/
   /*
    //fondo difuminado
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color de fondo semi-transparente
    backdropFilter: 'blur(10px)', // Esto crea el efecto de difuminado
    */
    /*
    //fpondo normal
    backgroundColor: '#343a40',
    */
import '../../../assets/navbar.css'
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/Sin título.png'; // Asegúrate de reemplazar esto con la ruta a tu archivo de logo
import LogoutButton from './LogoutBtn';

// Definimos los estilos en un objeto para mantener nuestro código limpio y organizado
const styles = {
  navbar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: '0.5rem',
    margin:'0',
    backdropFilter: 'blur(5px)', // Esto crea el efecto de difuminado
    borderBottom: '2px solid #f8f9fa',
    alignItems: 'center',
    width:'auto',
    zIndex:111,
    fontFamily:'Arial'
    
    
  },
  link: {
    textDecoration: 'none',
    color: '#f8f9fa',
    fontSize: '18px',
  },
  activeLink: {
    color: '#007bff',
  },
  logo: {
    borderRadius:'50%',
    height: '40px', // Puedes ajustar esto según el tamaño que desees para tu logo
  },
}

const Navbar: FC = () => {
  const location = useLocation();

  // Creamos una función para determinar el estilo de un enlace
  const getLinkStyle = (path: string) => (
    location.pathname === path ? {...styles.link, ...styles.activeLink} : styles.link
  );

  return (
    <ul style={styles.navbar} className='water'>
      <li><img src={logo} alt="Logo" style={styles.logo} /></li>
      <li><Link style={getLinkStyle('/')} to="/">Home</Link></li>
      <li><Link style={getLinkStyle('/admin')} to="/admin">Admin</Link></li>
      <li><Link style={getLinkStyle('/protected')} to="/protected">UProfile</Link></li>
      {/* <li><Link style={getLinkStyle('/api')} to="/api">test</Link></li> */}
      <li><LogoutButton/></li>
    </ul>
  )
}

export default Navbar;




