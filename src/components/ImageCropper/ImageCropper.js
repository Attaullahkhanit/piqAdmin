import React, { useCallback, useState } from "react";
import "./styles.scss";
import Cropper from "react-easy-crop";
import cropperCorner from "../../assets/business/home/cropperCorner.png";
import cropperEdge from "../../assets/business/home/cropperEdge.png";
import { Modal, Typography } from "@mui/material";
import OutlineButton from "../Buttons/Outline/OutlineButton";
import PrimaryButton from "../Buttons/Primary/PrimaryButton";
import { getCroppedImg } from "./utils";
export default function ImageCropper({
  openModal,
  handleClose,
  image,
  background,
  setCroppedImage,
  setCroppedImageBase64,
  setCroppedBackground,
  setCroppedBackgroundBase64,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(0);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const makeCroppedImage = useCallback(async () => {
    try {
      if (image) {
        const { base64, url } = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImageBase64(base64);

        setCroppedImage(url);
      } else {
        const { base64, url } = await getCroppedImg(
          background,
          croppedAreaPixels
        );
        setCroppedBackgroundBase64(base64);
        setCroppedBackground(url);
      }
    } catch (e) {
      console.error(e);
    }
  }, [image, background, croppedAreaPixels]);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      className="image-cropper-modal"
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="modal-container">
        <div className="image-cropper-modal-container">
          <img src={cropperCorner} alt="corner" className="corner-top-left" />
          <img src={cropperCorner} alt="corner" className="corner-top-right" />
          <img
            src={cropperCorner}
            alt="corner"
            className="corner-bottom-left"
          />
          <img
            src={cropperCorner}
            alt="corner"
            className="corner-bottom-right"
          />
          <img src={cropperEdge} alt="edge" className="edge-top" />
          <img src={cropperEdge} alt="edge" className="edge-right" />
          <img src={cropperEdge} alt="edge" className="edge-bottom" />
          <img src={cropperEdge} alt="edge" className="edge-left" />

          <Cropper
            image={image || background}
            crop={crop}
            zoom={zoom}
            cropShape={image ? "round" : "rect"}
            aspect={1}
            cropSize={{ width: 330, height: 330 }}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="image-cropper-modal-footer">
          <div className="top-area">
            <Typography className="footer-header">
              Edit {image ? "Thumbnail" : "background"}
            </Typography>
            <Typography className="footer-description">
              Please make sure your image is centered.
            </Typography>
          </div>
          <div className="bottom-area">
            <OutlineButton text={"Cancel"} />
            <PrimaryButton
              text={"Save"}
              onClick={() => {
                makeCroppedImage();
                handleClose();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
