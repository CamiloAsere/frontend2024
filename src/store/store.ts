// store.ts
import { StateCreator, create } from "zustand";
import { persist, devtools } from 'zustand/middleware'
interface User {
  id: number
  name: string;
  role: 'admin' | 'user';
};
type Store = {
  user: User | null;
  token: string | null;
  errorMessage: string;
  authenticate: (id: number, name: string, role: 'admin' | 'user', token: string) => void;
  signOut: () => void;
  setError: (message: string) => void;
};

const store: StateCreator<Store> = (set) => ({
  user: null,
  token: null,
  errorMessage: '',
  authenticate: async ( id, name, role, token) => {
    //Aca falta definir bien el objeto user
    set({ user: {id, name, role }, token });
  
   
  },
  signOut: () => set({ user: null, token: null }),
  setError: (message) => {
    set({ errorMessage: message });
    setTimeout(() => set({ errorMessage: '' }), 2500);
  },
});


export const useAuthStore = create<Store>()(
  devtools(
    persist(
      store,
      { name: 'auth-storage' }
    )
  )
);


/*
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
type User = {
  name: string;
  role: 'admin' | 'user';
};
type Store = {
  user: User | null;
  token: string | null; // Agrega esta línea
  errorMessage: string;
  authenticate: (name: string, role: 'admin' | 'user', token: string) => void; // Modifica esta línea
  signOut: () => void;
  setError: (message: string) => void;
};

export const useAuthStore = create<Store>(
  persist(
  (set) => ({
  user: null,
  token: null, // Agrega esta línea
  errorMessage: '',
  authenticate: (name, role, token) => set({ user: { name, role }, token }), // Modifica esta línea
  signOut: () => set({ user: null, token: null }), // Modifica esta línea
  setError: (message) => {
    set({ errorMessage: message });
    setTimeout(() => set({ errorMessage: '' }), 5000); // Limpia el mensaje después de 5 segundos
  },
}), {
  name: 'auth-storage', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
}
)

)

*/