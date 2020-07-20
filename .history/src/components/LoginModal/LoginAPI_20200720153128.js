import axios from "axios";

export const loginUser = async (user) => {
  try {
    const data = await axios.post(`https://localhost:5000/auth/login`, user);
    return data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
