import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

// getting a single business data

const addBusinessMenuCategory = async (businessId, category) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${PIQ_BASE_URL}/business/add-business-menu-category`, { businessId, category })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addBusinessMenuCategory;