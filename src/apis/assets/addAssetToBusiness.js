import axios from "axios";
import { PIQ_BASE_URL } from "../variables";
import { reformatAssetData } from "../../utils/reformatAssetData";

// AddAsset Post Api
export const addAssetToBusiness = (data, businessData) => {
  return new Promise((resolve, reject) => {
    const baseUrl = `${PIQ_BASE_URL}/assets/add-asset-to-business`;
    axios
      .post(baseUrl, reformatAssetData(data, businessData))
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
