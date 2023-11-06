import axios from "axios";
import { PIQ_BASE_URL } from "../../variables";

const getAllAssetCountsByStatus = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${PIQ_BASE_URL}/assets/get-all-assets-count-by-status`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default getAllAssetCountsByStatus;