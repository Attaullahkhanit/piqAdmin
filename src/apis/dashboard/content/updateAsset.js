import axios from "axios";
import { PIQ_BASE_URL } from "../../variables";

export const updateAssetById = async (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/assets/update-asset`, {
        assetId: id,
        ...data,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
