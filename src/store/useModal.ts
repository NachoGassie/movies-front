import { create } from "zustand";

interface State {
  showModal: boolean;
  component: JSX.Element | null; 
  timeOut: number | null;
}
interface Action {
  closeModal: () => void;
  setComponent: (x: JSX.Element, timeOut?: number) => void,
  clearComponent: () => void
}

const initialState = {
  showModal: false,
  component: null,
  timeOut: null,
}

export const useModalStore = create<State & Action>()((set) => ({
 ...initialState,

  closeModal: () => set({showModal: false}),
  setComponent: (component: JSX.Element, timeOut?: number) => {
    set({
      component,
      showModal: true,
      timeOut,
    })
  },
  clearComponent: () => set(initialState)
  
}));