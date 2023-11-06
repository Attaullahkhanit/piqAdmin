import axios from "axios";
import { PIQ_BASE_URL, URL } from "../../variables";

export const fetchAssetById = async (id) => {
  const response = await axios
    .get(`${PIQ_BASE_URL}/assets/get-asset-by-id?assetId=${id}`, )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response?.data?.data;
};
