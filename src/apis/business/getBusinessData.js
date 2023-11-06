import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

// getting a single business data

const getSingleBusinessData = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/business/get-business-by-id?businessId=${id}`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getSingleBusinessData;
