import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

const getAllBusinessCountsByStatus = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${PIQ_BASE_URL}/business/get-all-businesses-count-by-status`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default getAllBusinessCountsByStatus;