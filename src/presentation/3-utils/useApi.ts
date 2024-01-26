// useApi.ts
import { Question } from '../../store/panel/store';
import { addQuestion, createApi, deleteQuestion, fetchQuestions, updateQuestion } from './api';
import { AxiosInstance } from 'axios';
export interface ApiFunctions {
  fetchQuestions: (page: number, pageSize: number, searchTerm: string) => Promise<Question[]>;
  addQuestion: (data: Question) => Promise<Question>;
  updateQuestion: (id: string, data: Question) => Promise<Question>;
  deleteQuestion: (id: string) => Promise<void>;
}

export const useApi = (baseURL: string): ApiFunctions => {
  const api: AxiosInstance = createApi(baseURL);
  
  return {
    fetchQuestions: fetchQuestions(api),
    addQuestion: addQuestion(api),
    updateQuestion:updateQuestion(api),
    deleteQuestion: deleteQuestion(api),
    // ...
  };
};
