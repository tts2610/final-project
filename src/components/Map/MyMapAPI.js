import axios from "axios";

export const uploadRestaurants = async (restaurant) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/`, restaurant);
    return res;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
