import { create } from "zustand";

const useModeStore = create((set) => ({
  isDarkMode: true,
  setIsDarkMode: (newMode) => set({ isDarkMode: newMode }),
}));

export default useModeStore;
