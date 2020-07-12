import axios from "axios";
export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
  }
};

export const signOut = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.log("dont mess with my app");
  }
};
