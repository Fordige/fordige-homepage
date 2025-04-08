import { create } from "zustand";
import { en } from "../locales/en";
import { zh } from "../locales/zh";

const useLanguageStore = create((set) => ({
  language: "zh",
  content: zh,
  setLanguage: (language) =>
    set({ language, content: language === "zh" ? zh : en }),
}));

export default useLanguageStore;
