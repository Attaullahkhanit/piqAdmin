import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const getRequestedProfiles = async (lastKey, pageSize) => {
  let colRef = query(
    collection(db, "business"),
    where("status", "==", "pending"),
    // orderBy("id"),
    limit(pageSize),
  );
    if (lastKey) {
      colRef = query(
        collection(db, "business"),
        orderBy("id"),
        startAt(lastKey),
        where("status", "==", "pending"),
        limit(pageSize),
      );
    }
  try {
    const data = [];
    const colSnap = await getDocs(colRef);
    colSnap.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getRequestedProfiles;
