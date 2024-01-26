import { FC, ChangeEvent, useState } from 'react';
import useAdminState from '../../../4-hooks/useAdminState';
import { useApi } from '../../../3-utils/useApi';
import { AdminContext } from './AdminContext';

interface Question {
  // Define las propiedades de tu objeto Question aquí
  id:number
  name:string;
  username:string;
  DataPlan:{};
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  questions: Question[];
  totalItems: number;
  loading: boolean;
  errorMessage: string;
  newQuestion: Question;
  editingQuestion: Question | null;
  currentView: string;
}

const API_URL='http://localhost:5000/users'
const { deleteQuestion, updateQuestion, addQuestion } = useApi(API_URL);

const initialState: State = {
  page: 1,
  pageSize: 10,
  searchTerm: '',
  questions: [],
  totalItems: 0,
  loading: false,
  errorMessage: '',
  newQuestion: {
    // Inicializa las propiedades de newQuestion aquí
  },
  editingQuestion: null,
  currentView: 'adding'
};

export const AdminProvider: FC = ({ children }) => {
  const extractUserData = (data: any, state: State) => {
    return {
      questions: data, // Cambiado de data.results a data
    };
  };

  const [state, updateState] = useAdminState(API_URL, initialState, extractUserData);
  const { questions, page, pageSize, totalItems /*,searchTerm,loading, errorMessage, newQuestion, editingQuestion, currentView */ } = state;
  const totalPages =Math.ceil(totalItems / pageSize );
  
  // define your handling functions here
  const clearErrorMessage = () => {
    updateState({ errorMessage: '', currentView: 'adding' });
  };
  const handleError = (error: any, defaultMessage: string) => {
    console.error(error);
    updateState({ errorMessage: error.response?.data?.error || defaultMessage });
  }
  const handleAddQuestion = async (data: Question) => {
    try {
      const newQuestion = await addQuestion(data);
      updateState({ questions: [...questions, newQuestion], update: !state.update });
    } catch (error) {
      console.error(error);
      handleError(error, 'Error al agregar nueva pregunta');
    }
    //clearErrorMessage();
  };
  const updateQuestionsState = (updatedQuestion: Question) => {
    updateState({
      questions : questions.map(question =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    });
  }
  const handleUpdateQuestion = async (data: Question) => {
    clearErrorMessage();
    try {
      const updatedQuestion = await updateQuestion(data.id, data);
      updateQuestionsState(updatedQuestion);
    } catch (error) {
      console.error(error);
      handleError(error, 'Error al actualizar pregunta' );
    }
    updateState({ editingQuestion: null });
  };
  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestion(id);
      updateState({ questions: questions.filter(question => question.id !== id), update: !state.update });
    } catch (error) {
      console.error(error);
      handleError(error, 'Error al eliminar pregunta' );
      
    }
  };
  
  const handleEditQuestion = (id: string) => {
    const questionToEdit = questions.find(question => question.id === id);
    updateState({ editingQuestion: questionToEdit, currentView: 'editing' });
  };
  const handlePrevPage = () => {
    if (Number.isInteger(page) && page > 1) {
      updateState({ page: page - 1 });
    }
  };
  
  const handleNextPage = () => {
    if (Number.isInteger(page) && Number.isInteger(totalPages) && page < totalPages ) {
      updateState({ page: page + 1 });
    }
  };
  
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ searchTerm: event.target.value });
  };
  
  return (
    <AdminContext.Provider value={{ state, handleAddQuestion, handleEditQuestion, handleUpdateQuestion, handleDeleteQuestion, handlePrevPage, handleNextPage, onSearch }}>
      {children}
    </AdminContext.Provider>
  );
}
