import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import axios from "axios";
import { PIQ_BASE_URL } from "../variables";
import { reformatAssetData } from "../../utils/reformatAssetData";

const getAllAssetsFromFirebase = async () => {
  const colref = collection(db, "assets");

  const snapshot = await getDocs(colref);
  const allAssets = [];
  snapshot.forEach((doc) => {
    allAssets.push(doc.data());
  });
  return allAssets;
};

export default getAllAssetsFromFirebase;
