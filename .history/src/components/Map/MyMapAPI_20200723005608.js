import axios from "axios";

export const uploadRestaurants = async (restaurant, userList) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    var user = userList[Math.floor(Math.random() * userList.length)];
    restaurant["owner_id"] = user._id;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/`, restaurant);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
