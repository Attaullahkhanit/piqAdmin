import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const addAsset = async (assetsData) => {
  const URL = PIQ_BASE_URL + "/assets/add-asset";
  return new Promise((resolve, reject) => {
    axios
      .post(URL, assetsData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default addAsset;
