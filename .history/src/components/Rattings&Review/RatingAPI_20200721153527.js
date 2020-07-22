import axios from "axios";

export const getReivewByRestaurantID = async (id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
    return res.data.data;
  } catch (error) {
    return new Error(error.response.message);
  }
};
