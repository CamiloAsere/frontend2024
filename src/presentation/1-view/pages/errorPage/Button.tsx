//import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Button({display="inline-block",fontSize,bghover="#a945c7",transitionDelay="1s",className="btn-neon", content ,type,onClick,bgcolor,color,href="#",fontType="arial",zIndex="10",
  textTransform="uppercase",width="auto",height="2.2rem",textShadow,borderRadius="2rem",padding="0.5rem",marginLeft="0.3rem"}) {
  return  <Link to={href} ><StyledButton 
  fontSize={fontSize}
  className={className}
  transitionDelay={transitionDelay}
  display={display}
  zIndex={zIndex}
  fontType={fontType}
  background={bgcolor}
  bghover={bghover} 
  color={color} 
  type={type} 
  onClick={onClick}
  textShadow={textShadow} 
  borderRadius={borderRadius} 
  textTransform={textTransform} //upper-case
  padding={padding}
  marginLeft={marginLeft}
  width={width} //28%
  height={height}//2.5rem
  
  >
 
    <span id="span1"></span>
        <span id="span2"></span>
        <span id="span3"></span>
        <span id="span4"></span>
{content}   

</StyledButton>
</Link>
}

//warning #ffc107
//sucess #28a745
//secondary #6c757d
//primary #007bff
const StyledButton = styled.button`
  display: ${(props) => props.display};/* flex*/
  align-items: center;
  justify-content: center;
  position: relative;
  z-index:${(props) => props.zIndex};
  font-size:${(props) => props.fontSize};
  font-style:${(props) => props.fontType};
  margin-left:${(props) => props.marginLeft};
  background: ${(props) => props.background};
  text-transform: ${(props) => props.textTransform};
  text-shadow: ${(props) => props.textShadow};
  letter-spacing: 0.2rem;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  color: ${(props) => props.color};
  border-radius:  ${(props) => props.borderRadius};
  cursor: pointer;
  padding:${(props) => props.padding};
  text-decoration: none;
  overflow: hidden;
  transition: 0.2s;

  :hover{
    background: ${(props) => props.bghover};
    box-shadow: 0 0 10px #a945c7, 0 0 40px #a945c7, 0 0 80px #a945c7;
    transition-delay: ${(props) => props.transitionDelay};
  }
span{
    position: absolute;
    display: flex;/* block */
  }
  #span1{
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent,#a945c7);
  }
:hover #span1{
    left: 100%;
    transition: 1s;
  }
  #span3{
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent,#a945c7);
  }
:hover #span3{
    right: 100%;
    transition: 1s;
    transition-delay: 0.5s;
  }
  #span2{
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg,transparent,#a945c7);
  }
:hover #span2{
    top: 100%;
    transition: 1s;
    transition-delay: 0.25s;
  }
  #span4{
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg,transparent,#a945c7);
  }
:hover #span4{
    bottom: 100%;
    transition: 1s;
    transition-delay: 0.75s;
  }
a{
    text-align:center;
  }


`;
