import axios from "axios";

export const updateUser = async (id, formData) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    const res = await axios.put(`http://localhost:5000/user/me/`, formData, {
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
