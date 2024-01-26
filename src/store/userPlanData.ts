//userPlanData.ts
import {create} from 'zustand';
// Define the interface
export interface UserData {
  name: string;
  email: string;
  username: string;
  dataPlan: string;
  userType: string;
}
interface DataPlan{
  name: string;
  quota: string; // Cambia 'quote' a 'quota'
}

type State = {
  dataPlans: Array<{ id: string; name: string }>;
  userData: {
    name: string;
    email: string;
    username: string;
    dataPlan: string;
    userType: string;
  };
  dataPlanData: {
    name: string;
    quota: string;
  };
  error: string | null;

  setUserData: (newUserData: State['userData']) => void;
  setDataPlanData: (newDataPlanData: State['dataPlanData']) => void;
  setError: (newError: State['error']) => void;
  setDataPlans: (newDataPlans: State['dataPlans']) => void;
};



// Luego en tu definición de función

export const useStore = create<State>(set => ({
  dataPlans: [],
  userData: {
    name: '',
    email: '',
    username: '',
    dataPlan: '',
    userType: ''
  },
  dataPlanData: {
    name: '',
    quota: ''
  },
  error: null,
  setUserData: (newUserData: UserData) => set(state => ({ userData: newUserData })),
  setDataPlanData: (newDataPlanData: DataPlan) => set(state => ({ dataPlanData: newDataPlanData })),
  setError: (newError) => set({ error: newError }),
  setDataPlans: (newDataPlans) => set({ dataPlans: newDataPlans }),
}));
