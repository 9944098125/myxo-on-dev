import React, { Fragment, useState, useCallback, useEffect } from "react";
import "./imageUpload.css";
import { useSelector, connect, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import upload from "../../Assets/Images/upload.png";
import {
  updateCoverImage,
  updateProfileImage,
} from "../../Redux/Actions/imageUploadAction";
import { useNavigate, useParams } from "react-router";
import Alert from "../Modal/modal";
import Loader from "../Loader/loader";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";
import { roles} from '../Shared/constants';


import "cropperjs/dist/cropper.css";

function ImageUpload() {
  //Global variable:
  const id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");

  //State Hook:
  const [file, setFile] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropper, setCropper] = useState(false);
  const [show, setShow] = useState(false);


  //OnChangeHandlers (start):
  const uploadImage = (data) => {
    setFile(data);
    if (Number(params.id) === 2) {
      setCropper(true);
      handleShow();
    } else {
      setCropper(false);
      handleShow();
    }
  };

  const roundSize = {
    width: 250,
    height: 250,
  };
  const rectSize = {
    width: 910,
    height: 146,
  };

  //Redux State:
  const sidePanel = useSelector((state) => state.sidePanel);
  const alert = useSelector((state) => state.alert);
  const responseData = useSelector((state) => state.imageUpload);

  //Router Params:
  const params = useParams();

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Route Navigate:
  const navigation = useNavigate();

  //UseEffects(start):
  useEffect(() => {
    if (Number(role_id) === roles.TRAINER_ROLE_ID) {
      if (alert.type === "success_clear") {
        navigation("/trainer-profile");
      }
    } else {
      if (alert.type === "success_clear") {
        navigation("/user-profile");
      }
    }
  }, [alert, navigation, dispatch, role_id]);
  //UseEffects(end):

  // const submit = () => {
  //   if (Number(role_id) === 2) {
  //     if (typeof cropper1 !== "undefined") {
  //       setCropData(cropper1.getCroppedCanvas().toDataURL());
  //       const fileData = dataURIToBlob(cropper1.getCroppedCanvas().toDataURL());
  //       if (params.id === 1 || params.id === "1") {
  //         const formData = new FormData();
  //         formData.append("coverPhoto", fileData);
  //         dispatch(updateCoverImage(id, formData));
  //       } else {
  //         const formData = new FormData();
  //         formData.append("profilePhoto", fileData);
  //         dispatch(updateProfileImage(id, formData));
  //       }
  //       setFile("");
  //     }
  //   }
  // };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (
      Number(role_id) === roles.TRAINER_ROLE_ID ||
      Number(role_id) === roles.USER_ROLE_ID
    ) {
      if (file[0]) {
        const img = URL.createObjectURL(file[0]);
        try {
          const croppedImage = await getCroppedImg(img, croppedAreaPixels);
          setCroppedImage(croppedImage);
          const fileData = dataURIToBlob(croppedImage);
          const formData = new FormData();
          if (Number(params.id) === 2) {
            formData.append("profilePhoto", fileData);
            dispatch(updateProfileImage(id, formData));
          } else {
            formData.append("coverPhoto", fileData);
            dispatch(updateCoverImage(id, formData));
          }
          setCropper(false);
          setFile("");
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [croppedAreaPixels, file, dispatch, id, role_id, params]);

  const dataURIToBlob = (file) => {
    const splitDataURI = file.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const onClose = useCallback(() => {
    // setCroppedImage(null);
    setCropper(false);
    setFile("");
    handleClose();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Fragment>
      {/* page wrapper*/}
      <div
        className={`page-wrapper ${
          sidePanel.toggle ? "sideClose" : "sideOpen"
        }`}
      >
        {/* container */}
        <div className="container">
          {/* alert */}
          {alert.message && <Alert show={true} />}
          {/* heading */}
          <div className="row">
            <div className="col borders mx-3">
              <span className="small-heading">UPLOAD A PHOTO</span>
            </div>
          </div>
          {/* image-container */}
          <div className="image-container m-2">
            {responseData.loading ? (
              <div className="image-loader">
                <Loader />
              </div>
            ) : (
              <>
                <div className="text1 mb-5">
                  Upload an image you want to share with your peers
                </div>

                {/* drag-drop files */}
                <Dropzone
                  onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}
                  accept="image/*"
                >
                  {({ getRootProps, fileRejections, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="dropzone text-center">
                      <img src={upload} className="upload" alt="uploadImage" />
                      <p>Drag & Drop your files here</p>
                      <p>OR</p>
                      <button className="btn primary-button browser-btn">
                        Browse files
                      </button>
                    </div>
                  </div>
                </section>
                )}
                </Dropzone>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  {file[0] ? (
                    <>
                      <p>{Number(params.id) === 2}</p>
                      {Number(params.id) === 2 ? (
                        <div id="profile-crop">
                          <Cropper
                            image={URL.createObjectURL(file[0])}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropSize={roundSize}
                            cropShape="round"
                          />
                        </div>
                      ) : (
                        <div id="cover-crop">
                          <Cropper
                            image={URL.createObjectURL(file[0])}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropSize={rectSize}
                            cropShape="rect"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </div>

          {file[0] ? (
            <div className="row action">
              <div className="col-4">
                <button className="secondary-button btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
              <div className="col text-end">
                <button
                  className="primary-button btn"
                  onClick={showCroppedImage}
                >
                  Save Changes{" "}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  imageUpload: state.imageUpload,
});

export default connect(mapStateToProps, {
  updateCoverImage,
  updateProfileImage,
})(ImageUpload);
