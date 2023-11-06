import { PIQ_BASE_URL } from "../../variables";
import axios from "axios";

const approveProfileInFirebase = (profileId, approval) => {
  return new Promise((resolve, reject) => {
    const URL = `${PIQ_BASE_URL}/business/update-business`;
    axios
      .post(URL, { status: approval, businessId: profileId })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default approveProfileInFirebase;
