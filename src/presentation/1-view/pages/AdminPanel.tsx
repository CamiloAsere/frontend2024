//AdminPanel.tsx
import styled from 'styled-components';
import { useAuthStore } from '../../../store/store';
import UsersPage from '../test-views/UsersTable2';
import List from '../test-views/List';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Title = styled.h1`
  color: blue;
  font-size: 2em;
`;

const ErrorMessage = styled.p`
  color: red;
`;

function AdminPanel() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== 'admin') {
    return <ErrorMessage>No tienes permiso para acceder a esta página.</ErrorMessage>;
  }

  // Aquí va la lógica para crear, editar y eliminar usuarios

  return (  
    <PanelContainer>
        <Title>Admin Panel</Title>
        <UsersPage/>
        
      {/* Aquí va la interfaz del panel de administración */}
      <List/>
    </PanelContainer>
  );
}

export default AdminPanel;
