import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
// import Navbar from './v1/Navbar'; // Importa tu componente Navbar aquí
//import './v1/layout.module.css';

export const RespContainer = styled.div`
  width: 100%;
  font-size: 1.2rem;
  margin: 0 auto;
`;

export const Main = styled.main`
  background-color: #343a40;
  color: #f8f9fa;
`;

export const Section = styled.section`
  position: relative;
  width: 100%;
  z-index: 0;
`;

export const Overlay = styled.div`
  min-height: 92.5vh;
  width: 100%;
  height:100%;
  position:relative;
  top: 0;
  left: 0;
`;

export const Footer = styled.footer`
  background-color: rgba(255,255,255,.2);
  color: #f8f9fa;
  align-items: center;
  bottom: 0;
  position: fixed; // Cambiado de fixed a relative
  width: 100%;
  text-align: center;
`;

const Layout: React.FC = () => {
    return (
        <RespContainer>
            <header>
                {/* <Navbar/> */} {/* Descomenta esta línea para usar tu componente Navbar */}
            </header>
            <h1>home view</h1>
            <Main>
                <Section>
                    <Overlay>
                        <Outlet/>
                    </Overlay>
                </Section>
            </Main>
            <Footer>
                <pre>
                    Copyright <a href="#">Info-45 </a>
                    {new Date().getFullYear()}
                </pre>
            </Footer>    
        </RespContainer>
    )
}

export default Layout;
