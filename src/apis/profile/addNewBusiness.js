import axios from "axios";
import { PIQ_BASE_URL } from "../variables";
import refactorProfileBusinessData from "../../utils/refactorProfileBusinessData";

const addNewBusiness = (businessData) => {
  const data = refactorProfileBusinessData(businessData);
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/add-business`, data )
      .then((res) => {
 resolve(res?.data);
   })
      .catch((err) => {
        reject(err);
      });
  });
};

export default addNewBusiness;