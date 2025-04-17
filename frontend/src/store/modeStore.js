import { create } from "zustand";

const getInitialMode = () => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("Fordige-isDarkMode");
    return savedMode !== null ? JSON.parse(savedMode) : true;
  }
  return true;
};

const useModeStore = create((set) => ({
  isDarkMode: getInitialMode(),
  setIsDarkMode: (newMode) => {
    set({ isDarkMode: newMode });
    if (typeof window !== "undefined") {
      localStorage.setItem("Fordige-isDarkMode", JSON.stringify(newMode));
    }
  },
}));

export default useModeStore;
