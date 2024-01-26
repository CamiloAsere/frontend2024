//AppProvider.tsx
import { useAuthStore } from "../../../store/store";
import useAdminState from "../../4-hooks/useAdminState";
import { AppContext } from "./AppContext";
const link:string="https://loclahost:8080/questions"
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const initialState = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        questions: [],
        totalItems: 0,
        loading: false,
        errorMessage: '',
        newQuestion: {
          question: '',
          image: '',
          options: [],
          correctAnswer: ''
        },
        editingQuestion: null,
        currentView: 'adding'
      };
    const user = useAuthStore((state) => state.user);
   //Tambien se me ocurre jalar directamente de useStore a la hora de sacar mi variables de estado
  //Solo usar useAdminStore para actualizar el estado
  const [state, updateState] = useAdminState(initialState, link); 
  const {questions, page, pageSize, totalItems ,errorMessage ,loading,searchTerm}=state

 
    return (
      <AppContext.Provider value={{ user ,questions, page, pageSize, totalItems ,errorMessage ,loading,searchTerm}}>
        {children}
      </AppContext.Provider>
    );
};