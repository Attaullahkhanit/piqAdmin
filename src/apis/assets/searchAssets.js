import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const searchAssets = (searchQuery) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/assets/search-content`, { searchQuery })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default searchAssets;
