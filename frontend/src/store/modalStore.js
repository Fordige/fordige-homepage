import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  target: null,
  openModal: (target) => set({ isModalOpen: true, target }),
  closeModal: () => set({ isModalOpen: false, targe: null }),
}));

export default useModalStore;
