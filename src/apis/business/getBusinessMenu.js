import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

// getting a single business data

const getBusinessMenu = async (businessId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/get-business-menu`, { businessId })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getBusinessMenu;
