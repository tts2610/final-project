import axios from "axios";

export const loginUser = async (user) => {
  try {
    // ${process.env.REACT_APP_API_URL}
    const data = await axios.post(`http://localhost:5000/auth/login`, user);
    return data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
