//Layout.ytsx
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/store";
import styled, { keyframes } from 'styled-components';
import Navbar from "./components/Navbar";
import '../../assets/layout.module.css';
import src from '../../assets/wp5542870.png'
interface LayoutProps {
  children?: ReactNode;
}
const Footer=styled.div`
  align-items: center;
  bottom: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  background: rgba(255,255,255,.2);
  ` 
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const LayoutContainer = styled.div`
  animation: 1s ${fadeIn} ease-out;
 
`;

const ErrorMessage = styled.div`
z-index:99;
  color: red;
  position: fixed;
  top: 5rem;
  left: 3rem;
  align-content:center;
  width: auto;
  padding: 10px;
  text-align: center;
  background-color: rgba(255,255,255,0.9);
`;
const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  background-image: url(${src});
  background-repeat: no-repeat;
  background-size: cover;
  height:100%
`;
const Layout: React.FC<LayoutProps> = () => {
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const user= useAuthStore((state) => state.user);
  
  return (
    <LayoutContainer>
      <header>
      <Navbar/>
      </header>
      <ContentContainer>
      {errorMessage && <ErrorMessage>{errorMessage} {user?.role}</ErrorMessage>}
      
      <main>
     
        <section>
        
        <Outlet/>
        </section>
      
      </main>
      
      
      
      <footer>
      <Footer>
          <pre>
            Copyright <a href="#">Univ </a>
            {new Date().getFullYear()}
          </pre>
          </Footer>
      </footer>
      </ContentContainer>
    </LayoutContainer>
  )
}

export default Layout;
