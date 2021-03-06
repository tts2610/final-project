import axios from "axios";

export const getReivewByRestaurantID = async (id, page) => {
  try {
    // ${process.env.REACT_APP_API_URL}
    const res = await axios.get(`http://localhost:5000/review/${id}?page=${page}&perPage=3`);
    console.log(res);
    return res.data.data;
  } catch (error) {
    return new Error(error.response.message);
  }
};
