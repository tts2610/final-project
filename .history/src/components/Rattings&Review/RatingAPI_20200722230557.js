import axios from "axios";

export const getReivewByRestaurantID = async (id, page) => {
  try {
    // ${process.env.REACT_APP_API_URL}
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}?page=${page}&perPage=3`);
    return res.data.data;
  } catch (error) {
    return new Error(error.response.message);
  }
};
