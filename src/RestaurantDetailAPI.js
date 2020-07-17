import axios from "axios";

export const getDetail = async (id) => {
  try {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`);
    // const data = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/getDistance`, coord);

    return data.data.data;
  } catch (error) {
    if (error) {
      console.log(error);
      return new Error(error.response.data.message);
    }
  }
};

export const getMenuByRestaurantID = async (id) => {
  try {
    const menuList = await axios.get(`${process.env.REACT_APP_API_URL}/menu/${id}`);
    return menuList.data.data.menuList;
  } catch (error) {
    console.log(error);
    return new Error(error.response.data.message);
  }
};

export const getDistinctCategory = async (resID) => {
  try {
    const categoryList = await axios.get(`${process.env.REACT_APP_API_URL}/menu/distinctCategory/${resID}`);
    return categoryList.data.data.distinctCategoryList;
  } catch (error) {
    console.log(error);
    return new Error(error.response.data.message);
  }
};
