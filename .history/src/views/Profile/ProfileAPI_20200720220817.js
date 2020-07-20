import axios from "axios";

export const updateUser = async (id, user) => {
  // console.log(restaurant);${process.env.REACT_APP_API_URL}
  try {
    const res = await axios.put(
      `http://localhost:5000/user/me/`,
      { user },
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${id}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
