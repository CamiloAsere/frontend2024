// store.ts
import {create} from 'zustand';
 // Define el tipo para una sola pregunta
export interface Question {
    question: string;
    image: string;
    options: string[];
    correctAnswer: string;
    id: string;
  }
 

// Define tu estado inicial
export type State = {
  searchTerm: string;
  page: number;
  pageSize: number;
  loading: boolean;
  questions: Question[];
  totalItems: number;
  errorMessage: string;
  currentView: string;
};

// Define tu tienda Zustand
export const useStore = create<State>((set) => ({
  searchTerm: '',
  page: 1,
  pageSize: 10,
  loading: false,
  questions: [],
  totalItems: 0,
  errorMessage: '',
  currentView: 'read',
}));

