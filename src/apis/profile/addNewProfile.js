import addAsset from "../assets/addAsset";
import refactorContentData from "../../utils/refactorContentData";
import refactorProfileData from "../../utils/refactorProfileData";
import { PIQ_BASE_URL } from "../variables";
import axios from "axios";
const addNewProfile = async (profile) => {
  const URL = PIQ_BASE_URL + "/business/add-business";
  return new Promise((resolve, reject) => {
    const assetPromises = profile.videoContent.map((item) => {
      return addAsset(refactorContentData(item, profile.profileInformation));
    });
    Promise.all(assetPromises).then((res) => {
      const data = refactorProfileData(profile.profileInformation);
      data.businessAssets = [];
      res.forEach((item) => {
        data.businessAssets.push(item.data);
      });
      console.log(data);
      axios
        .post(URL, data)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export default addNewProfile;
