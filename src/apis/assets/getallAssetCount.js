import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const getallAssetCount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/assets/get-all-assets-count`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getallAssetCount;