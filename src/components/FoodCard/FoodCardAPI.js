import axios from "axios";

export const getDistance = async (coord) => {
  try {
    const data = await axios.post(`http://localhost:5000/restaurants/getDistance`, coord);

    return data.data.data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
