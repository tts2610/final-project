import axios from "axios";

export const uploadRestaurants = async (restaurant) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    const resUsers = await axios.get(`https://foody-clone.herokuapp.com/users/`);
    let { userList } = resUsers.data.data;
    console.log(userList);
    const res = await axios.post(`http://localhost:5000/restaurants/`, restaurant);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
