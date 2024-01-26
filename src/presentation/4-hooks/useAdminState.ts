import { useEffect, useRef } from 'react';
import { useStore, State, Question } from '../../store/panel/store';
import { ApiFunctions, useApi } from '../3-utils/useApi';
// Luego, usa ese tipo para definir el array de preguntas
type Questions = Question[];
type FetchQuestionsResponse = {
    questions: Questions;
    totalItems: number;
  };
  
// Define tu hook personalizado
//Revisar si realmente es necesario definir otro  estado inicial ya q zustand al parecer crea un estado inicial
const useAdminState = (baseURL: string, initialState?: State, extraFunction?: (data: any, state: State) => any): [State, (newState: Partial<State>) => void] => {
//const useAdminState = (initialState?: State, baseURL: string): [State, (newState: Partial<State>) => void] => {
  const apiFunctions: ApiFunctions = useApi(baseURL);
  
  const state = useStore();
  
  const searchTermRef = useRef(state.searchTerm);
  
  const updateState = (newState: Partial<State>) => {
    useStore.setState(newState);
  };

  const fetchQuestionsData = async () => {
    updateState({ loading: true });
    try {
      const data: FetchQuestionsResponse = await apiFunctions.fetchQuestions(state.page, state.pageSize, state.searchTerm);
      // Actualiza el estado directamente con los datos obtenidos de la API
     //updateState({ questions: data.questions, totalItems: data.totalItems });

     const newData = extraFunction ? extraFunction(data, state) : data;
      updateState({ questions: newData.questions, totalItems: newData.totalItems });
    } catch (error: unknown) {
        if (error instanceof Error) {
          updateState({ errorMessage: error.message });
        } else if (typeof error === 'string') {
          updateState({ errorMessage: error });
        } else {
          // manejar otros casos o rechazar el error
          throw error;
        }
      }
       finally {
      updateState({ loading: false });
    }
  };

  useEffect(() => {
    if (searchTermRef.current !== state.searchTerm) {
      searchTermRef.current = state.searchTerm;
      const timeoutId = setTimeout(fetchQuestionsData, 500);
      return () => clearTimeout(timeoutId);
    }
    fetchQuestionsData();
  }, [state.searchTerm, state.page, state.pageSize]);

  return [state, updateState];
};

export default useAdminState;