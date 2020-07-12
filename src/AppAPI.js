import axios from "axios";
export const responseFacebook = async (data) => {
  if (data && data.accessToken) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/facebook?token=${data.accessToken}`);
      const { user, token } = res.data.data;
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      return new Error(error.response.message);
    }
  }
};

export const responseGoogle = async (response) => {
  if (response && response.accessToken) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/login/google?token=${response.accessToken}`);
      const { user, token } = res.data.data;
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      return new Error(error.response.message);
    }
  }
};
