import React, { Fragment, useEffect, useState } from "react";
import "../TrainerHomePage/trainerHomePage.css";
import { Link } from "react-router-dom";
import camera from "../../Assets/Images/camera1.svg";
import camera1 from "../../Assets/Images/camera.svg";
import noProfileImage from "../../Assets/Images/noProfile.png";
import { useSelector } from "react-redux";

function ImageLayout() {
  const role_id = localStorage.getItem("role_id");

  //State Hook:
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //Redux State:
  const data = useSelector((state) => state.trainerProfile);

  //Redux Dispatch:
  // const dispatch = useDispatch();

  //UseEffects (start):
  // useEffect(() => {
  //   const id = localStorage.getItem("user_id");
  //   // dispatch(cover_image(id));
  // }, [dispatch]);

  useEffect(() => {
    setCoverImage(data.coverPhoto);
    setProfileImage(data.profilePhoto);
  }, [data.coverPhoto, data.profilePhoto]);

  return (
    <Fragment>
      {coverImage != null || "" ? (
        <>
          <div className="row">
            <img
              src={coverImage}
              alt="coverImage"
              className="rounded-3 cover-image img-fluid"
            />
            <div className="add-cover-button">
              {Number(role_id) === 2 ? (
                <Link to="/trainer-account/imageUpload/1">
                  <button className="btn btn-2 btn-sm">
                    Change cover
                    <img src={camera1} alt="icon" className="mx-3" />
                  </button>
                </Link>
              ) : (
                <Link to="/user-account/imageUpload/1">
                  <button className="btn btn-2 btn-sm">
                    Change cover
                    <img src={camera1} alt="icon" className="mx-3" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="add-cover-image">
          {Number(role_id) === 2 ? (
            <Link to="/trainer-account/imageUpload/1">
              <button className="btn btn-2 btn-sm">
                Change cover
                <img src={camera1} alt="icon" className="mx-3" />
              </button>
            </Link>
          ) : (
            <Link to="/user-account/imageUpload/1">
              <button className="btn btn-2 btn-sm">
                Change cover
                <img src={camera1} alt="icon" className="mx-3" />
              </button>
            </Link>
          )}
        </div>
      )}

      <div className="profile-image">
        {profileImage != null || "" ? (
          <img
            src={profileImage}
            alt="profileImage"
            className="profile"
          />
        ) : (
          <img
            src={noProfileImage}
            alt="noProfileImage"
            className="profile"
          />
        )}
        <div className="camera">
          {Number(role_id) === 2 ? (
            <Link to="/trainer-account/imageUpload/2">
              <img src={camera} alt="camera" />
            </Link>
          ) : (
            <Link to="/user-account/imageUpload/2">
              <img src={camera} alt="camera" />
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ImageLayout;
