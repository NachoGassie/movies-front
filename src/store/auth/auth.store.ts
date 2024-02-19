import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState{
  token: string;
  isLogged: boolean;
}
interface AuthAction{
  setToken: (token: string) => void;
  closeSession: () => void;
}

const initialState: AuthState = {
  token: '',
  isLogged: false,
}

export const useAuthStore = create<AuthState & AuthAction>()(persist(
  (set) => ({
    ...initialState,

    setToken: (token) => {
      set({
        token, 
        isLogged: token.length > 0
      });
    },

    closeSession: () => set(initialState),

  }),{
    name: 'token'
  }
));