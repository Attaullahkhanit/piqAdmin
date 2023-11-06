import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const deleteAsset = (assetId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/assets/delete-asset`, { assetId })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default deleteAsset;