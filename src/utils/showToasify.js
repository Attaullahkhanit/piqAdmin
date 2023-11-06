import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastProperties = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
}

export const showToastSuccess = (message, options = {}) => {
  console.log("toast opened");
  return toast.success(message, {
    ...toastProperties,
    ...options,
  });
};

export const showToastWarning = (message, options = {}) => {
  return toast.warning(message, {
    ...toastProperties,
    ...options,
  });
};

export const showToastError = (message, options = {}) => {
  return toast.error(message, {
    ...toastProperties,
    ...options,
  });
};
