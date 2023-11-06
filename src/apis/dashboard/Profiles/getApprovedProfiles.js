import axios from "axios";
import { PIQ_BASE_URL } from "../../variables";
const getApprovedProfiles = async (pageNumber, pageSize, status) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/business/get-all-businesses?page=${pageNumber}&page_size=${pageSize}${status === "all" ? "" : `&status=${status}`}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default getApprovedProfiles;
