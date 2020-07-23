import axios from "axios";

export const updateUser = async (id, formData) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/me/`, formData, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${id}`,
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};

export const getActivities = async (id) => {
  try {
    // ${process.env.REACT_APP_API_URL}
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/getActivities/${id}`);

    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};

export const getRestaurantList = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/restaurants/${id}?page=1&perPage=4`);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
