import React, { Fragment, useEffect, useState } from "react";
import "./ProfileDescription.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  cover_image,
  profile_description,
} from "../../Redux/Actions/trainerProfileActions";
import noProfileImage from "../../Assets/Images/noProfile.png";
import { Formik, Field, Form } from "formik";
import { updateTrainerBio } from "../../Redux/Actions/profileDescriptionAction";
import Alert from "../Modal/modal";
import { useNavigate } from "react-router";
import { nameErrors, roles } from "../Shared/constants";

function ProfileDescription() {
  const role_id = localStorage.getItem("role_id");

  //State Hook:
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [formValues, setFormValue] = useState({
    title: "",
    username: "",
    bio: "",
  });

  //Redux State:
  const data = useSelector((state) => state.trainerProfile);
  const data1 = useSelector((state) => state.trainerProfile.userBio);
  const alert = useSelector((state) => state.alert);
  // const LoginDetails = useSelector((state) => state.auth);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Used to navigate
  const navigation = useNavigate();

  //UseEffects (start):
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(cover_image(id));
    dispatch(profile_description(id));
  }, [dispatch]);

  useEffect(() => {
    setProfileImage(data.profilePhoto);
  }, [data.profilePhoto]);

  useEffect(() => {
    if (data.userInfo) {
      if (data.userInfo[0]) {
        setUserName(
          data.userInfo[0].first_name + " " + data.userInfo[0].last_name
        );
      }
    }

    if (data1.length > 0) {
      setFormValue({
        title: data1[0].title,
        bio: data1[0].bio,
        username: data1[0].user_name,
      });
    }
  }, [data, data1]);

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
  //UseEffects (end):

  //Validation (start):
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = nameErrors.USERNAME
    }
    return errors;
  };
  //Validation (end):

  //OnChangeHandlers (start):
  const callUpdateApi = (values) => {
    const apiData = {
      bio: "",
      title: "",
      user_name: "",
    };
    if (values) {
      apiData.bio = values.bio;
      apiData.title = values.title;
      apiData.user_name = values.username;
    }
    const id = localStorage.getItem("user_id");
    dispatch(updateTrainerBio(id, apiData));
  };
  //OnChangeHandlers (end):

  return (
    <Fragment>
      {/* heading */}
      <div className="row">
        <div className="col">
          <span className="main-heading px-4">Profile Description</span>
          <div className="mx-4">
            <hr></hr>
          </div>
        </div>
      </div>
      {/* alert */}
      {alert.message && <Alert show={true} />}
      {/* profile-container */}
      <div className="profile-container m-1 row">
        {/* profile-image */}
        <div className="profile-image1 col-3 mb-5">
          {profileImage != null || "" ? (
            <img
              src={profileImage}
              alt="profileImage"
              width="100px"
              height="100px"
              className="profile1"
            />
          ) : (
            <img
              src={noProfileImage}
              alt="noProfileImage"
              width="100px"
              height="100px"
              className="profile1"
            />
          )}
        </div>
        {/* user-name */}
        <div className="user-name col mb-5">
          <span>{userName}</span>
        </div>

        {/* form */}
        <div className="form-section pro-padding">
          <Formik
            initialValues={formValues}
            validateOnChange={false}
            validateOnBlur={false}
            validate={(values) => validate(values)}
            enableReinitialize
            onSubmit={(values) => {
              callUpdateApi(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mb-4">
                  <label className="form-label">
                    Title
                    <span className="fst-italic text-muted1">
                      {" "}
                      (pick a title that suits you best)
                    </span>
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="ex. Certified personal trainer with 3 years of experience"
                    className={
                      errors.title && touched.title
                        ? "form-control login-input-field is-invalid"
                        : "form-control login-input-field"
                    }
                  />
                  {touched.title && errors.title ? (
                    <div className="invalid-feedback">{errors.title}</div>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">
                    Username
                    <span className="fst-italic text-muted1">
                      {" "}
                      (pick a username that suits you best)
                    </span>
                  </label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="ex. @jane.crossfiter"
                    className={
                      errors.username && touched.username
                        ? "form-control login-input-field is-invalid"
                        : "form-control login-input-field"
                    }
                  />
                  {touched.username && errors.username ? (
                    <div className="invalid-feedback">{errors.username}</div>
                  ) : null}
                </div>

                <div className="form-group mb-5">
                  <label className="form-label">
                    About
                    <span className="fst-italic text-muted1">
                      {" "}
                      (Let us know a bit about yourself)
                    </span>
                  </label>
                  <Field
                    name="bio"
                    as="textarea"
                    type="text"
                    placeholder="Pellentesque ante nunc sit..."
                    className={
                      errors.bio && touched.bio
                        ? "form-control login-input-field is-invalid"
                        : "form-control login-input-field"
                    }
                  />
                  {touched.bio && errors.bio ? (
                    <div className="invalid-feedback">{errors.bio}</div>
                  ) : null}
                </div>

                <div className="row mx-2">
                  <div className="col mb-4 text-end">
                    <button
                      type="submit"
                      className="btn primary-button"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  trainerProfile: state.trainerProfile,
  sidePanel: state.sidePanel,
});

export default connect(mapStateToProps, {
  cover_image,
  profile_description,
  updateTrainerBio,
})(ProfileDescription);
