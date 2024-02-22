import { create } from "zustand";

interface State {
  showModal: boolean;
  component: JSX.Element | null; 
}
interface Action {
  closeModal: () => void;
  setComponent: (x: JSX.Element) => void,
  clearComponent: () => void
}

const initialState = {
  showModal: false,
  component: null,
}

export const useModalStore = create<State & Action>()((set) => ({
 ...initialState,

  closeModal: () => set({showModal: false}),
  setComponent: (component: JSX.Element) => {
    set({
      component,
      showModal: true,
    })
  },
  clearComponent: () => set(initialState)
  
}));