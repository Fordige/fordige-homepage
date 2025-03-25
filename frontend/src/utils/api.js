import axios from "./axios";

export const createCase = async (formData) => {
  try {
    const { data, status } = await axios.post("create-case/", formData);
    console.log(status);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
