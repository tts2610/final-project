import axios from "axios";
export const getListByCategory = async (resID, catID) => {
  try {
    const categoryList = await axios.get(`${process.env.REACT_APP_API_URL}/menu/${resID}/${catID}`);

    return categoryList.data.data.list;
  } catch (error) {
    console.log(error);
    return new Error(error.response.data.message);
  }
};
