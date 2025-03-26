import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  isRegisterModalOpen: false,
  target: null,
  openModal: (target) => set({ isModalOpen: true, target }),
  closeModal: () => set({ isModalOpen: false, targe: null }),
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
}));

export default useModalStore;
