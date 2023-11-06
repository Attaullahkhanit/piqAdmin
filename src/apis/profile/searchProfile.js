import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const searchProfile = (businessName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/business/search-business-by-name`, {businessName})
      .then((res) => {
      resolve(res.data);
   })
      .catch((err) => {
        reject(err);
      });
  });
};

export default searchProfile;