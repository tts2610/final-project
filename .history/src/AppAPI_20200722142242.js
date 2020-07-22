import axios from "axios";
export const responseFacebook = async (data) => {
  if (data && data.accessToken) {
    // ${process.env.REACT_APP_API_URL}
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
      const res = await axios.get(`http://localhost:5000/auth/login/google?token=${response.accessToken}`);

      const { user, token } = res.data.data;
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      return new Error(error.response.message);
    }
  }
};

export const getRestaurantList = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/`);
    // console.log(res.data.data.restaurantList);
    return res.data.data.restaurantList;
  } catch (error) {
    // console.log(error.response.message);
    return new Error(error.response.message);
  }
};

// address: "692/8 Đoàn Văn Bơ, Phường 16, Quận 4"
// image: "https://res.cloudinary.com/da5mx5vau/image/upload/v1594655528/Images/e5f6c5f6a70449448bcbf538c215e483_1593535200124860620_asvnhw.jpg"
// introduction: ""
// latitude: "10.7573583"
// longitude: "106.7121855"
// name: "lavida coffeefee & tea - nguyễn tri phương"
// owner_id: "5f0ab018df99fb0017a06811"
// phoneNumber: "0394823948"
