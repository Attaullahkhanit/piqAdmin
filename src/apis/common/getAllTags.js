import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const getAllTags = async () => {
  const colRef = query(collection(db, "labels"), orderBy("name"));
  try {
    const data = [];
    const colSnap = await getDocs(colRef);
    colSnap.forEach((doc) => {
      data.push(doc.data()?.name);
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllTags;