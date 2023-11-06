import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

export const searchLocation = (searchValue) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PIQ_BASE_URL}/business/location-search?location=${searchValue}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
