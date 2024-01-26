//UserDetails.tsx
import { useQuery } from 'react-query';
import styled from 'styled-components';
import male from "../../../assets/user-yellow-female.png"
import female from "../../../assets/user-yellow.png"
import List from '../test-views/List';
import { User , fetchGeneric, transformUser } from '../components/fOptions';
import { DSpinner } from '../../../assets/dinamic spinner/Spinner';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useAuthStore } from '../../../store/store';

const UserDetailsContainer = styled.div`
  display: flex;
  /*flex-direction: column;*/
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color:rgba(0, 0, 0, 0.5);
  
  backdrop-filter: blur(1px); // Esto crea el efecto de difuminado
  color: #333; // Añade esto
  
`;
const UserDetailsCard = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

const UserDetailsHeader = styled.h2`
  margin-bottom: 1rem;
`;

const UserDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserDetailsLabel = styled.span`
  font-weight: bold;
`;

const UserDetailsValue = styled.span``;


const GenderIcon = styled.img`
  width: 50px;
  height: 50px; // Asegúrate de que el alto y el ancho sean iguales para un círculo perfecto
  border-radius: 50%; // Esto hará que la imagen sea redonda
  box-shadow: 0px 0px 10px rgba(0,0,0,1.5); // Esto añade un efecto de sombra
  object-fit: cover; // Esto asegura que la imagen cubra todo el espacio disponible sin distorsionarse
  align-items: center;
  position: absolute;
  top: 4.0rem;
  right: 17rem;
  @media (max-width: 768px) {
    
    right: 3rem;
  }
`;
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress  variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const UserDetails = () => {
  const userdata = useAuthStore((state) => state.user);
  console.log("userdata info to display ",userdata)
  const id = Math.floor(Math.random() * 9) + 1;
  const { data: user, isLoading, error } = useQuery<User, Error>('user', () => fetchGeneric(`https://jsonplaceholder.typicode.com/users/${id}`, transformUser));
  if (isLoading) {
    return <DSpinner/>;
  }

  if (error) {
    return <div>Error al cargar los datos del usuario.</div>;
  }

  if (!user) {
    return null;
  }
//importar el usuario q se ha registrado y obtner sus datos 
  return ( <UserDetailsContainer>
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel  value={'percentageAvailable'} />
    </Box>
    <UserDetailsCard>
      <UserDetailsHeader>Detalles de la cuenta</UserDetailsHeader>
      {user.gender === 'male' ? (
      <GenderIcon src={male} alt="Icono de hombre" />
    ) : (
      <GenderIcon src={female} alt="Icono de mujer" />
    )}
      <UserDetailsRow>
        <UserDetailsLabel>Nombre:</UserDetailsLabel>
        <UserDetailsValue>{user.name}</UserDetailsValue>
      </UserDetailsRow>
      <UserDetailsRow>
        <UserDetailsLabel>Nombre de usuario:</UserDetailsLabel>
        <UserDetailsValue>{user.username}</UserDetailsValue>
      </UserDetailsRow>

      <UserDetailsHeader>Plan de Internet</UserDetailsHeader>
      <UserDetailsRow>
        <UserDetailsLabel>Megas disponibles:</UserDetailsLabel>
        <UserDetailsValue>{user.megasAvailable}</UserDetailsValue>
      </UserDetailsRow>
      <UserDetailsRow>
        <UserDetailsLabel>Megas usados:</UserDetailsLabel>
        <UserDetailsValue>{user.megasUsed}</UserDetailsValue>
      </UserDetailsRow>
      <UserDetailsRow>
        <UserDetailsLabel>Total de megas del plan:</UserDetailsLabel>
        <UserDetailsValue>{user.totalMegasPlan}</UserDetailsValue>
      </UserDetailsRow>
    </UserDetailsCard>
    <List/>
  </UserDetailsContainer>
  );
};

export default UserDetails;
