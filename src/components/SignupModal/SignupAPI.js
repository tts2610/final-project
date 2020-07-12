import axios from "axios";

export const signUpUser = async (user) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, user);
    return data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
