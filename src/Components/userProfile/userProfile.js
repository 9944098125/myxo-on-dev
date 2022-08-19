import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/loginAction";
import fb from "../../Assets/Images/social-facebook-dark.svg";
import insta from "../../Assets/Images/Union-dark.svg";
import twitter from "../../Assets/Images/Vector-dark.svg";
import image from "../../Assets/Images/image.svg";
import timeline from "../../Assets/Images/timeLine.png";
import post from "../../Assets/Images/post.png";
import profile from "../../Assets/Images/profile1.png";
import ImageLayout from "../Common/ImageLayout";
import { profile_description } from "../../Redux/Actions/trainerProfileActions";
import {roles} from '../Shared/constants';
import "./userProfile.css";
// import {
//   profile_description,
// } from "../../Redux/Actions/trainerProfileActions";

export const UserProfile = () => {

  //State Hook:
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  //Redux Dispatch
  const dispatch = useDispatch();

  //Redux state
  const data = useSelector((state) => state.trainerProfile);
  const LoginDetails = useSelector((state) => state.auth);
  const sidePanel = useSelector((state) => state.sidePanel);

  //UseEffects (start)
  useEffect(() => {
    if (Number(LoginDetails.role_id) === roles.TRAINER_ROLE_ID) {
      dispatch(logout());
    }
  }, [LoginDetails, dispatch]);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(profile_description(id));
  }, [dispatch]);


  useEffect(() => {
    if (data.userInfo && data.userBio) {
      if (data.userInfo[0]) {
        setUserName(
          data.userInfo[0].first_name + " " + data.userInfo[0].last_name
        );
      }
    }
    if (data.userBio) {
      if (data.userBio[0]) {
        setUserMail(data.userBio[0].user_name);
        setUserDescription(data.userBio[0].bio);
      }
    }
    if (data.social) {
      if (data.social[1] !== "" || data.social[1] != null) {
        setFbLink(data.social[1]);
      }
      if (data.social[0] !== "" || data.social[0] != null) {
        setInstaLink(data.social[0]);
      }
      if (data.social[2] !== "" || data.social[2] != null) {
        setTwitterLink(data.social[2]);
      }
    }
  }, [data.userInfo, data.userBio, data.social]);
  //UseEffects (end):


  return (
    <Fragment>
      {/* page wrapper*/}
      <div
        className={`page-wrapper ${sidePanel.toggle ? "sideClose" : "sideOpen"
          }`}
      >
        <div className="container">
          <ImageLayout />

          <div className="row">
            {/* profile-description */}
            <div className="col-md-8 mt-2">
              <div className="col-md-8">
                <div className="sac-btn-container">
                  {/* schedule a class btn container */}
                  <div className="col">
                    <div className="profile-name">{userName}</div>
                    <div className="profile-mail fst-italic">
                      {userMail}
                    </div>
                  </div>
                </div>
                <div className="profile-description">
                  {userDescription}
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-4 followers">810 following</div>
                <div className="col-4 followers">1,240 followers</div>
                <div className="col">
                  {fbLink &&
                    <a href={fbLink} target="_blank" rel="noreferrer">
                      <img src={fb} alt="fb" className="mx-3 ms-5 fb" />
                    </a>
                  }
                  {instaLink &&
                    <a href={instaLink} target="_blank" rel="noreferrer">
                      <img src={insta} alt="insta" className="mx-3" />
                    </a>
                  }
                  {twitterLink &&
                    <a href={twitterLink} target="_blank" rel="noreferrer">
                      <img src={twitter} alt="twitter" className="mx-2" />
                    </a>
                  }
                </div>
              </div>
            </div>

            {/* right panel */}
            <div className="col-md text-end">
              <div className="d-flex justify-content-around">
                <span className="text-11 mb-2">
                  NEXT CLASS WILL START IN{" "}
                  <span className="text-12">0:15:43 min</span>
                </span>
              </div>

              <div className="image-row mb-2">
                <div className="d-flex justify-content-around">
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-2">
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                  <div className="col-md me-1">
                    <img src={image} alt="image1" width="50px" height="50px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row ms-1 mb-3">
            <div className="col borders">
              <span className="small-heading">TIMELINE</span>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-md">
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
              <img src={timeline} alt="time" width="50px" className="mx-2" />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-8 bg-1 mx-2">
              <div className="row px-3">
                <div className="col-1">
                  <img src={profile} alt="profile" width="50px" />
                </div>
                <div className="col">
                  <span className="profile-description">John Doe</span>
                  <div className="profile-description">@john.crossfiter</div>
                </div>
              </div>
              <div className="row px-3">
                <div className="col profile-description">
                  Last night workout was on 🔥
                </div>
              </div>
              <div className="row px-3">
                <img src={post} alt="post" width="676px" height="175px" />
              </div>
            </div>
            <div className="col-md bg-1">
              <div className="row mx-2">
                <div className="col borders">
                  <span className="small-heading">Suggestions</span>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="">
                  <img src={profile} alt="profile" />
                </div>
                <div className="ms-2">
                  <h6 className="profile-description">John Doe</h6>
                  <span className="profile-description">@john.crossfiter</span>
                </div>
                <div className="ms-2">
                  <button className="btn secondary-button">Follow</button>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="">
                  <img src={profile} alt="profile" />
                </div>
                <div className="ms-2">
                  <h6 className="profile-description">John Doe</h6>
                  <span className="profile-description">@john.crossfiter</span>
                </div>
                <div className="ms-2">
                  <button className="btn secondary-button">Follow</button>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="">
                  <img src={profile} alt="profile" />
                </div>
                <div className="ms-2">
                  <h6 className="profile-description">John Doe</h6>
                  <span className="profile-description">@john.crossfiter</span>
                </div>
                <div className="ms-2">
                  <button className="btn secondary-button">Follow</button>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="">
                  <img src={profile} alt="profile" />
                </div>
                <div className="ms-2">
                  <h6 className="profile-description">John Doe</h6>
                  <span className="profile-description">@john.crossfiter</span>
                </div>
                <div className="ms-2">
                  <button className="btn secondary-button">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
