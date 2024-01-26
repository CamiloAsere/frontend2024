// useStorage.ts
import { create, StateCreator } from "zustand";
import { persist } from 'zustand/middleware'
export interface AuthState {

    status: AuthStatus;
    token?: string;
    user?: User;
  
    loginUser: ( email: string, password: string ) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logoutUser: () => void;
  }
type Config = {
  name: string;
  storage?: Storage;
};

export const customUseStorage = <T extends object>(store: StateCreator<T>, config: Config) => {
  const { name, storage = sessionStorage } = config;

  return create<T>(() => persist(store, {
    name,
    storage,
  }));
};
