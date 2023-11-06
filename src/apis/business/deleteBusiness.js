import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const deleteBusiness = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/delete-business`, {
        businessId: id,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default deleteBusiness;
