import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState{
  idUser: number;
  token: string;
  isLogged: boolean;
}
interface AuthAction{
  setToken: (idUser: number, token: string) => void;
  closeSession: () => void;
}

const initialState: AuthState = {
  idUser: -1,
  token: '',
  isLogged: false,
}

export const useAuthStore = create<AuthState & AuthAction>()(persist(
  (set) => ({
    ...initialState,

    setToken: (idUser, token) => {
      set({
        idUser,
        token, 
        isLogged: token.length > 0
      });
    },

    closeSession: () => set(initialState),

  }),{
    name: 'token'
  }
));