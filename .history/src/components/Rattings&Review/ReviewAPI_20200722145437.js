import axios from "axios";

export const postReview = async (review) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/review`, review);
    return res.data.data;
  } catch (error) {
    return new Error(error.response.message);
  }
};
