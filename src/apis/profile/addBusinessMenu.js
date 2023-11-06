import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

// getting a single business data

const addBusinessMenu = async (businesId, category) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/get-business-menu`, { businesId, category })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default addBusinessMenu;
