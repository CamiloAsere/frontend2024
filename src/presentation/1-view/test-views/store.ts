// store.ts
import {create} from 'zustand';
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export type DataPlan = {
    name: string;
    quota: number;
    dataUsed: number;
  };
  
export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    DataPlan: DataPlan
  };

type Store = {
    users: User[];
    dataPlans: DataPlan[];
    editingUser: User | null;
    setUsers: (users: User[]) => void;
    setDataPlans: (dataPlans: DataPlan[]) => void;
    setEditingUser: (user: User | null) => void;
    updateUser: (id: string, updatedUser: User) => void;
    removeUser: (id: string) => void;
    addUser: (user: User) => void;
  };

export const useStore = create<Store>(set => ({
  users: [],
  dataPlans: [],
  editingUser: null,
  setUsers: (users: User[]) => set({ users }),
  setDataPlans: (dataPlans: DataPlan[]) => set({ dataPlans }),
  setEditingUser: (user: User | null) => set({ editingUser: user }),
  updateUser: (id, updatedUser) => set(state => ({ 
    users: state.users.map(user => user.id  ===  id  ? updatedUser : user) })),
  removeUser: (id) => set(state => ({ 
    users: state.users.filter(user => user.id !== id) })),
  addUser: (user) => set(state => ({ users: [...state.users, user] })),
 
}));
 