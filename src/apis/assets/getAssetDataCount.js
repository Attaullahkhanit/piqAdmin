import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const getAssetDataCount = (businessId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/get-assets-data-count`, { businessId })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAssetDataCount;