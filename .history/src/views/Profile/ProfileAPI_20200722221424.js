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
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};

export const getActivities = async (id, page) => {
  try {
    // ${process.env.REACT_APP_API_URL}
    const res = await axios.get(`http://localhost:5000/users/getActivities/${id}?page=${page}&perPage=6`);
    console.log(res);
    return res.data.data.result;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
