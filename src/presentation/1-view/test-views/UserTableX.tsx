
/*
import { ChangeEvent, FC, useState } from 'react';
import useAdminState from "../../4-hooks/useAdminState";
import { useApi } from '../../3-utils/useApi';
import SearchBar from './SearchBar';

interface User {
  id: number;
  name: string;
  username: string;
  DataPlan?: {
    dataUsed: number;
    quota: number;
  };
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalItems: number;
  questions: User[];
  loading: boolean;
  errorMessage: string;
}

const API_URL='http://localhost:5000/users'
const { deleteQuestion, updateQuestion } = useApi(API_URL);

const UsersPage: FC = () => {
  const initialState: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    totalItems: 0,
    questions: [],
    loading: false,
    errorMessage: '',
  };

  const extractUserData = (data: User[], state: State) => {
    return {
      questions: data,
    };
  };

  const [state, updateState] = useAdminState<User, State>(API_URL, initialState, extractUserData);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ searchTerm: event.target.value });
  };

  const handleError = (error: Error, defaultMessage: string) => {
    console.error(error);
    updateState({ errorMessage: error.message || defaultMessage });
  }

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteQuestion(id);
      updateState({ questions: state.questions.filter(user => user.id !== id), update: !state.update  });
    } catch (error) {
      handleError(error, 'Error al eliminar usuario');
    }
  };

  return (
    <div>
      <p>{state.currentView}</p>
      <SearchBar searchTerm={state.searchTerm} onChange={handleSearchChange}/>
      {state.loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {state.questions.length > 0 ? state.questions.map(({id, name, username, DataPlan }) => (
            <li key={id}>
              <p>{id}</p>
              <p>{name}</p>
              <p>{username}</p>
              <p>{DataPlan?.dataUsed}</p>
              <p>{DataPlan?.quota}</p>
              <button onClick={handleDeleteUser(id)}>Eliminar</button>
            </li>
          )) : <p>No hay datos</p>}
        </ul>
      )}
    </div>
  );
}

export default UsersPage;
*/

import { ChangeEvent, useState } from 'react';
import useAdminState from "../../4-hooks/useAdminState";
import { useApi } from '../../3-utils/useApi';
import SearchBar from './SearchBar';
const API_URL='http://localhost:5000/users'
const { deleteQuestion, updateQuestion } = useApi(API_URL);
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
  //const { users, searchTerm }=state
  //console.log("users ")
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ searchTerm: event.target.value });
  };
  const handleError = (error, defaultMessage) => {
    console.error(error);
    updateState({ errorMessage: error.response?.data?.error || defaultMessage });
  }
  const handleDeleteUser = async (id) => {
    //Evaluar si el id a borrar coincide con el admin logeado
    try {
      await deleteQuestion(id); // Asegúrate de que esta función esté definida y envíe una solicitud DELETE a tu API
    updateState({ questions: state.questions.filter(user => user.id !== id), /* update: !state.update  */  });
    } catch (error) {
      console.error(error);
      handleError(error, 'Error al eliminar usuario');
    }
  };
  
  //const { user } = useAuthStore();
  return (
    <div>
     <p>{state.currentView}</p>
      <SearchBar searchTerm={state.searchTerm} onChange={handleSearchChange}/>
      {state.loading ? (
        <p>Cargando...</p>
        
      ) : (
        <ul>
          {
           state.questions? state.questions.map(({user, id, name,username, DataPlan }) => (
            <li key={id}>
              <p>{id}</p>
              <p>{name}</p>
              <p>{username}</p>
              <p>{DataPlan?.dataUsed}</p>
              <p>{DataPlan?.quota}</p>
              <button onClick={() => handleDeleteUser(id)}>Eliminar</button>
            </li>
          )) :<p> no hay datos</p> }
        </ul>
       
      )}
    </div>
  );
}

export default UsersPage;



