import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const getallBusinessCount = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/business/get-all-businesses-count`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getallBusinessCount;