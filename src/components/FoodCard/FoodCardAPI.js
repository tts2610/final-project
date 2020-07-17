import axios from "axios";

export const getDistance = async (coord) => {
  try {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/getDistance`, coord);

    return data.data.data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
