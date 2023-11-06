import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const saveBusiness = async (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/update-business`, {
        businessId: id,
        ...data,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default saveBusiness;
