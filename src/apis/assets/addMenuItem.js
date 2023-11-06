import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

export const addMenuItem = async (businessId, menuCategory, assetName, description, ownerTags, thumbnail, video, price) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("businessId", businessId);
        formData.append("menuCategory", menuCategory);
        formData.append("assetName", assetName);
        formData.append("description", description);
        formData.append("ownerTags", ownerTags);
        formData.append("price", price);
        formData.append("thumbnail", thumbnail); // Append the thumbnail file
        formData.append("video", video); // Append the video file

        axios
            .post(`${PIQ_BASE_URL}/assets/add-menu-item`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the content type for file uploads
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
