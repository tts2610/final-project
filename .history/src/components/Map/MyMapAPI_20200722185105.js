import axios from "axios";

export const uploadRestaurants = async (restaurant) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    const resUsers = await axios.get(`${process.env.REACT_APP_API_URL}/users/`);
    let { userList } = resUsers.data.data;
    userList = userList.filter((x) => x.role === "owner");
    var user = userList[Math.floor(Math.random() * userList.length)];
    restaurant["owner_id"] = user._id;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/`, restaurant);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
