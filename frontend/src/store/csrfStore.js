import { create } from "zustand";
import axios from "../utils/axios";

const useCsrfStore = create((set, get) => ({
  csrfToken: "",
  getCsrfToken: async () => {
    const { data } = await axios.get("get-csrf-token/");
    set({ csrfToken: data.csrfToken });
  },
  createCase: async (formData) => {
    try {
      const { data } = await axios.post("create-case/", formData, {
        headers: {
          "X-CSRFToken": get().csrfToken,
        },
      });
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  },
}));

export default useCsrfStore;
