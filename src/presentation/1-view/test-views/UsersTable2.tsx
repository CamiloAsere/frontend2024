
import styled from 'styled-components';
import styles from '../../../assets/TableQ.module.css';
import { useQuery } from 'react-query';
import { User, fetchGeneric, transformUsers } from '../components/fOptions';
import { useAuthStore } from '../../../store/store';

import { useApi } from '../../3-utils/useApi';
import useAdminState from '../../4-hooks/useAdminState';
const API_URL='http://localhost:5000/users'
const { deleteQuestion } = useApi(API_URL);
//import "./axiosConfig"
  
  const Table = styled.table`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: gray;
  `;
  
  const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #007bff;
  `;
  
  const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
  `;
  
  const ProgressBarContainer = styled.div`
    position: relative;
    width: 100%;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: black;
  `;
  const ProgressBarLabel = styled.span`
      position: absolute;
      width: 100%;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
  `;
  interface ProgressBarProps {
      percentage: number,
      color: string
  }
  
  const ProgressBar = styled.div<ProgressBarProps>`
      height: 20px;
      width: ${props => props.percentage}%;
      background-color: ${props => props.color};
      transition-duration:.5s; // Agregamos una transición para suavizar el cambio cuando se actualiza la barra de progreso
  `;
  interface ProgressBarComponentProps {
      percentage: number,
      color: string,
      label?: string
  }
  
  const ProgressBarComponent = ({ percentage, color, label }: ProgressBarComponentProps) => (
      <ProgressBarContainer>
          <ProgressBar percentage={percentage} color={color} />
          <ProgressBarLabel>{label}</ProgressBarLabel>
      </ProgressBarContainer>
  );
  
    function UsersPage() {
        const initialState = {
          page: 1,
          pageSize: 10,
          searchTerm: '',
          totalItems:0,
          questions:[],
          loading: false,
          errorMessage: '',
        };
        
        //console.log("users: ",state.questions)
        const extractUserData = (data, state) => {
          return {
            questions: data, // Cambiado de data.results a data
          };
        };
     const [state, updateState] = useAdminState(API_URL, initialState, extractUserData);
     const {questions,loading ,errorMessage }=state
     const  { user }= useAuthStore(); // Accede al rol desde el contexto
     //const { data: users,isLoading, error  } = useQuery<User[], Error>('users', () => fetchGeneric('http://localhost:5000/users',null))
    /*
    if ( isLoading ) {
        return <div>Cargando...</div>; // Reemplaza esto con tu componente de carga
    }

    if ( error) {
        return <div>Error al cargar los datos del usuario.</div>;
    }
*/
  if ( loading ) {
  return <div>Cargando...</div>; // Reemplaza esto con tu componente de carga
   }
    if (!questions) {
        return null;
    }

    
    const handleError = (error, defaultMessage) => {
        console.error(error);
        updateState({ errorMessage: error.response?.data?.error || defaultMessage });
      }
    const handleDeleteUser = async (id) => {
        //Evaluar si el id a borrar coincide con el admin logeado
        try {
          await deleteQuestion(id); // Asegúrate de que esta función esté definida y envíe una solicitud DELETE a tu API
          updateState({ questions: state.questions.filter(user => user.id !== id), update: !state.update  });
        } catch (error) {
          console.error(error);
          handleError(error, 'Error al eliminar usuario');
        }
      };
      
      
    return (
      <Table>
          <thead>
              <tr>
                  <Th>Nombre</Th>
                  <Th title='Nombre de usuario' className={styles.questionColumn}>Nombre de usuario</Th>
                  <Th title='Megas disponibles' className={styles.questionColumn}>Megas disponibles</Th>
                  <Th title='Megas usados' className={styles.questionColumn}>Megas usados</Th>
                  <Th title='Total de megas del plan' className={styles.questionColumn}>Total de megas del plan</Th>
                  {user?.role === 'admin' && (
                  <Th>Modify</Th>
                  )}             
              </tr>
          </thead>
          <tbody>
              {
              questions.map((post) => {
                {/*
                const percentageAvailable = post.totalMegasPlan ? post.megasAvailable / post.totalMegasPlan * 100 : 0;
                const percentageUsed = post.totalMegasPlan ? post.megasUsed / post.totalMegasPlan * 100 : 0;
                */}
                let quota = 0;
                let dataUsed = 0;
                console.log("UserId ",post.id)
                if (post.DataPlan) {
                  quota = post.DataPlan.quota;
                  dataUsed = post.DataPlan.dataUsed;
                }
                const megasAvailable = quota - dataUsed;
                //const megasAvailablePercent=megasAvailable ? megasAvailable /quota * 100  :  0;
                const percentageAvailable = quota ? megasAvailable / quota * 100 : 0;
                const percentageUsed = quota ? dataUsed / quota * 100 : 0;
            
                  return (
                      <tr key={post.id} >
                          <Td title={post.name} className={styles.questionColumn}>{post.name}</Td>
                          <Td>{ post.username}</Td>
                          <Td><ProgressBarComponent percentage={percentageAvailable} color="#28a745" label={`${megasAvailable}`} /></Td>
                          <Td><ProgressBarComponent percentage={percentageUsed} color="#007bff" label={`${dataUsed }`} /></Td>
                          <Td>{quota}</Td>
              
                          {user?.role === 'admin' && (
                          <Td>
                          <button>Editar</button>
                          <button onClick={() => handleDeleteUser(post.id)}>Eliminar</button>
                          </Td>
                          )}
                      </tr>
                  );
              })}
          </tbody>
      </Table>
  );
};

export default UsersPage;


