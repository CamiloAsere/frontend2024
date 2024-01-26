import styled from 'styled-components';

const ModalContainer = styled.div`
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;
  position: relative;
  
  padding: 2.3rem;

  border-radius: 4px;
  background-image: ${(props) => props.bgImg};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default ModalContainer;
/*
const ModalContainer=({children})=>{
  return (
  <Container>
    {children}
  </Container>)
}
*/