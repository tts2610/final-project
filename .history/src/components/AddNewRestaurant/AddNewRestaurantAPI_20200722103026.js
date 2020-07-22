import axios from "axios";

export const getTags = async (coord) => {
  // ${process.env.REACT_APP_API_URL}
  try {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/tags`, coord);

    return data.data.data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};
