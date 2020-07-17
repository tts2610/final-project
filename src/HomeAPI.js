import axios from "axios";
import data from "./menu_urls.json";
import { getRestaurantList } from "./AppAPI";

export const insertMenu = async () => {
  let restaurantList = await getRestaurantList();
  data.forEach(async (element) => {
    var restaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];
    element["restaurant_id"] = restaurant._id;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/menu/`, element);
    // console.log(res);
  });
};
