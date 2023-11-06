import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const getBusinessVideos = async (businessId) => {
  const colRef = query(
    collection(db, "assets"),
    where("businessId", "==", businessId)
  );
  const colSnap = await getDocs(colRef);
  const videosData = [];
  return new Promise((resolve, reject) => {
    try {
      colSnap.forEach((element) => {
        videosData.push(element.data());
      });
      console.log(videosData);
      resolve(videosData);
    } catch (error) {
      reject(error);
    }
  });
};

export default getBusinessVideos;
