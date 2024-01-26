import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import bender from '../../../assets/bender.jpg';
import atlas from  '../../../assets/universidad-de-matanzas.jpg'
import bobross from  '../../../assets/bob_ross.jpg';
import plus from  '../../../assets/plus-circle-frame.png';
import cross from  '../../../assets/cross.png';
import { Link } from 'react-router-dom';
import './styles.css';
interface ViewContainerProps {
  bgImage: string;
}
interface NavLinksProps {
  isOpen: boolean;
}
//Estilos predefinidos con styled-components
const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  color: white;
`;

const MenuButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
`;

const NavLinks = styled.div<NavLinksProps>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 60px;
  right: 15px;
  background-color: #007bff;
  padding: 0.8rem;

  animation: ${slideDown} 0.5s ease-out;
`;

const NavLink = styled.button`
  display: block;
  color: white;
  background-color: transparent;
  border: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
const ViewContainer = styled.div<ViewContainerProps>`
   animation: ${slideDown} 0.5s ease-out;
   text-align:center;
   color: orange; 
   border-radius: 10px; 
   box-shadow: rgba(0,0,0,0.1) 0px 4px 12px; 
   align-content:center;
   justify-content: center;
   position:absolute;
   background-image:url(${props => props.bgImage});
   background-size: cover; // Esto hará que la imagen de fondo cubra todo el contenedor
   margin-left:auto; // Ajustado para centrar el contenedor
   margin-right:auto; // Ajustado para centrar el contenedor
   width:auto; 
   max-width:none; 
   min-width:250px; 
   min-height:300px; 
   top:40px; 
   left:calc(101% +40px); // Ajustado para separar el contenedor del lado izquierdo
   @media (max-width:412px) {
    margin-left:auto; // Ajustado para centrar el contenedor en dispositivos móviles
    margin-right:auto; // Ajustado para centrar el contenedor en dispositivos móviles
    left:auto; // Ajustado para centrar el contenedor en dispositivos móviles
  }
`;
const morado='#572364'
const routes = [
  { path: '/'},
  { path: '/login' },
  { path: '/admin',  },
  { path: '/protected'},
  /*
  { path: '/users'},
  { path: '/strapi' },
  { path: '/sweet2'},
  { path: '/api', },
  { path: '/test'},
  */
];
const HomePage = () => {
    const [view, setView] = useState('home');
    const [isOpen, setIsOpen] = useState(false);

    const renderView = () => {
        switch(view) {
            case 'home':
                return (
                    <ViewContainer className='testClass' bgImage={atlas}>
                        <h3>Vista principal</h3>
                    </ViewContainer>
                );
            case 'services':
                return (
                    <ViewContainer bgImage={bender}>
                        <h3>Esta es la vista de servicios</h3>
                        <ul>
                       {  routes.map((route, index) => (
                        <li key={index}>
                       <Link to={route.path}>{route.path}</Link>
                        </li>
                       ))}
                        </ul>
                     
                    </ViewContainer>
                );
            case 'contact':
                return (
                    <ViewContainer bgImage={bobross}>
                        <h3>Esta es la vista de contacto</h3>
                    </ViewContainer>
                );
            default:
                return (
                    <ViewContainer bgImage={bender}>
                        <h3>Esta es la vista de inicio</h3>
                    </ViewContainer>
                );
        }
    };
   
    return (
        <Container>
            
            <Navbar>
                <MenuButton onClick={() => setIsOpen(!isOpen)}>
                    { <img  width={20} src={ isOpen ? cross : plus }/>}
                </MenuButton>
                <NavLinks isOpen={isOpen}>
                    <NavLink onClick={() => setView('home')}>Inicio</NavLink>
                    <NavLink onClick={() => setView('services')}>Servicios</NavLink>
                    <NavLink onClick={() => setView('contact')}>Contacto</NavLink>
                </NavLinks>
            </Navbar>

            {renderView()}
        </Container>
    );
};

export default HomePage;

