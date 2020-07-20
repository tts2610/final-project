import axios from "axios";
import data from "./user_urls.json";
import menu_data from "./menu_urls.json";
import { getRestaurantList } from "./AppAPI";

export const insertMenu = async () => {
  let restaurantList = await getRestaurantList();
  menu_data.forEach(async (element) => {
    var restaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];
    element["restaurant_id"] = restaurant._id;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/menu/`, element);
    // console.log(res);
  });
};

export const insertUser = async () => {
  data.forEach(async (element) => {
    // ${process.env.REACT_APP_API_URL}
    const res = await axios.post(`https://foody-clone.herokuapp.com/users/register`, element);
    // console.log(res);
  });
};

export const insertReview = async () => {
  let restaurantList = await getRestaurantList();
  let list = await axios.get("https://foody-clone.herokuapp.com/users/");
  let { userList } = list.data.data;
  userList = userList.filter((item) => item.role != "owner");
  for (let index = 0; index < 30; index++) {
    var restaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];
    var user = userList[Math.floor(Math.random() * userList.length)];
    let review = {
      restaurant_id: restaurant._id,
      email: user.email,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      rating: Math.floor(Math.random() * 6),
    };

    const res = await axios.post("https://foody-clone.herokuapp.com/review/", review);
    console.log(res);
  }
};
