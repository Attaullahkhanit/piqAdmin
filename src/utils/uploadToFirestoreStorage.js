import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const uploadToFirestoreStorage = async (file, type, name = "", isBase64) => {
  const uuid = uuidv4();
  const storageRef = ref(storage, `${type}/${uuid}${file?.name || name}`);
  var base64str;
  if (isBase64) {
    base64str = file;
  } else {
    base64str = await toBase64(file);
  }
  return new Promise((resolve, reject) => {
    uploadString(storageRef, base64str.split(",")[1], "base64")
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
      })

      .catch((error) => {
        reject(error);
      });
  });
};

export default uploadToFirestoreStorage;
