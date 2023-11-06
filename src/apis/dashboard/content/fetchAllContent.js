import axios from "axios";
import { PIQ_BASE_URL } from "../../variables";

export const fetchAllContent = async (page_number, page_size, status) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/assets/get-all-assets?page_size=${page_size}&page=${page_number}${status === "all" ? "" : `&status=${status}`}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
