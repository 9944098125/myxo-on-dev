import React, { Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import "./TrainerSettings.css";
import { updateTrainerSocialHandles } from "../../Redux/Actions/updateSocialHandles";
import Alert from "../Modal/modal";
import { profile_description } from "../../Redux/Actions/trainerProfileActions";
import angleDown from "../../Assets/Images/angle-down-small1.svg";
import { useNavigate } from "react-router";
import {roles} from '../Shared/constants';

function TrainerSettings() {
  //Global Variables:
  const id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");

  //Redux State:
  const sidePanel = useSelector((state) => state.sidePanel);
  const alert = useSelector((state) => state.alert);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Route Navigate:
  const navigation = useNavigate();

  //UseEffects (start):
  //useEffect
  useEffect(() => {
    if (Number(role_id) === roles.TRAINER_ROLE_ID || Number(role_id) === roles.USER_ROLE_ID) {
      dispatch(profile_description(id));
    }
  }, [dispatch, role_id, id]);

  //Alert
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
  }, [alert, navigation, role_id]);

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
          <div className="mb-4 pt-3">
            <span className="main-hd">Notifications</span>
          </div>
          <div className="profile-container">
            {/* alert */}
            {alert.message && <Alert show={true} />}
            {/* heading */}
            <div className="row">
              <div className="col mx-3 mt-4">
                <span className="m-3 headings-1">Messages</span>
                <hr></hr>
              </div>
            </div>

            {/* mobile */}
            <div className="row">
              <div className="col mx-3">
                <span className="m-3 headings-1">Mobile</span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3 mx-3">
                <div className="m-3 sm-heading">Show notification for:</div>
              </div>

              <div className="col-sm-5">
                <div className="dropdown mx-4">
                  <button
                    className="btn drp dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="row">
                      <div className="col">All activity</div>
                      <div className="col text-end">
                        <img src={angleDown} alt="icon" />
                      </div>
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col mx-3">
                <hr></hr>
              </div>
            </div>

            {/* email */}
            <div className="row">
              <div className="col mx-3">
                <div className="mt-3 mx-3 headings-1">Email</div>
                <div className="mt-1 mx-3 sm-heading-1">
                  (Sending to j*******@email.com)
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col mx-3">
                <div className="m-3 sm-heading">
                  Send an email with unread activity for:
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-5">
                <div className="dropdown mx-4">
                  <button
                    className="btn drp dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="row">
                      <div className="col">All activity</div>
                      <div className="col text-end">
                        <img src={angleDown} alt="icon" />
                      </div>
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-5">
                <div className="dropdown mx-4">
                  <button
                    className="btn drp dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="row">
                      <div className="col">All activity</div>
                      <div className="col text-end">
                        <img src={angleDown} alt="icon" />
                      </div>
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="foo">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="foo">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="foo">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col mx-3">
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Only send when offline
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  updateSocialHandles: state.updateSocialHandles,
});

export default connect(mapStateToProps, {
  updateTrainerSocialHandles,
  profile_description,
})(TrainerSettings);
