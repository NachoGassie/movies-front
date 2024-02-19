import { create } from "zustand";

interface State {
  showModal: boolean;
}
interface Action {
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<State & Action>()((set, get) => ({
  showModal: false,
  openModal: () => set({showModal: true}),
  closeModal: () => set({showModal: false}),
}));