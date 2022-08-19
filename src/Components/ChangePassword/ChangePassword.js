import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router";
import { Field, Form, Formik } from "formik";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { changePassword } from "../../Redux/Actions/changePasswordAction";
import { passwordErrors, roles } from "../Shared/constants";
import Alert from "../Modal/modal";

import "./ChangePassword.css";

function ChangePassword() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const alert = useSelector((state) => state.alert);
  const role_id = localStorage.getItem("role_id");

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Used to navigate
  const navigation = useNavigate();

  const passwords = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  function toggleShowPassword1() {
    setShowPassword1(!showPassword1);
  }

  function toggleShowPassword2() {
    setShowPassword2(!showPassword2);
  }

  function toggleShowPassword3() {
    setShowPassword3(!showPassword3);
  }

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

  function validate(passwords) {
    const errors = {};
    if (passwords.currentPassword === "") {
      errors.currentPassword = passwordErrors.PASSWORD;
    }
    if (passwords.newPassword === passwords.currentPassword) {
      errors.newPassword = passwordErrors.OLD_NEW_SAME;
    }
    if (passwords.newPassword === "") {
      errors.newPassword = passwordErrors.PASSWORD;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
        passwords.newPassword
      )
    ) {
      errors.newPassword = passwordErrors.PASSWORD_INVALID;
    }
    if (passwords.confirmNewPassword === "") {
      errors.confirmNewPassword = passwordErrors.CONFIRM_PASSWORD;
    } else if (passwords.confirmNewPassword !== passwords.newPassword) {
      errors.confirmNewPassword = passwordErrors.PASSWORDS_UNMATCHED;
    }
    return errors;
  }

  function handleChangePassword(passwords) {
    const id = localStorage.getItem("user_id");
    const passwordsData = {
      oldPassword: passwords.currentPassword,
      password: passwords.confirmNewPassword,
    };
    dispatch(changePassword(id, passwordsData));
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <span className="main-heading mx-4">Change Account Password</span>
          <div className="mx-4">
            <hr></hr>
          </div>
        </div>
      </div>
      {alert.message && <Alert show={true} />}
      <div className="passwords">
        <Formik
          initialValues={passwords}
          validate={(values) => validate(values)}
          onSubmit={(values) => handleChangePassword(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md">
                  <div className="form-group mb-4">
                    <label htmlFor="currentPassword" className="cp-label">
                      Current Password
                    </label>
                    <div className="input-group">
                      <Field
                        type={showPassword1 ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Enter your Current password"
                        className={
                          errors.currentPassword && touched.currentPassword
                            ? "form-control primary-input-field is-invalid pass"
                            : "form-control primary-input-field pass"
                        }
                      />
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        // onClick={() => toggleShowPassword(showPassword1)}
                        onClick={toggleShowPassword1}
                      >
                        {showPassword1 ? (
                          <VisibilityIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        ) : (
                          <VisibilityOffIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        )}
                      </span>
                      {touched.currentPassword && errors.currentPassword ? (
                        <div className="invalid-feedback">
                          {errors.currentPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md">
                  <div className="form-group mb-4">
                    <label htmlFor="newPassword" className="cp-label">
                      New Password
                    </label>
                    <div className="input-group">
                      <Field
                        type={showPassword2 ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter your New password"
                        className={
                          errors.newPassword && touched.newPassword
                            ? "form-control primary-input-field is-invalid pass"
                            : "form-control primary-input-field pass"
                        }
                      />
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        // onClick={() => toggleShowPassword(showPassword2)}
                        onClick={toggleShowPassword2}
                      >
                        {showPassword2 ? (
                          <VisibilityIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        ) : (
                          <VisibilityOffIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        )}
                      </span>
                      {touched.newPassword && errors.newPassword ? (
                        <div className="invalid-feedback">
                          {errors.newPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md">
                  <div className="form-group mb-4">
                    <label htmlFor="confirmNewPassword" className="cp-label">
                      Confirm New Password
                    </label>
                    <div className="input-group">
                      <Field
                        type={showPassword3 ? "text" : "password"}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm your New password"
                        className={
                          errors.confirmNewPassword &&
                          touched.confirmNewPassword
                            ? "form-control primary-input-field is-invalid pass"
                            : "form-control primary-input-field pass"
                        }
                      />
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        // onClick={() => toggleShowPassword(showPassword3)}
                        onClick={toggleShowPassword3}
                      >
                        {showPassword3 ? (
                          <VisibilityIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        ) : (
                          <VisibilityOffIcon
                            fontSize="small"
                            className="iconColor"
                          />
                        )}
                      </span>
                      {touched.confirmNewPassword &&
                      errors.confirmNewPassword ? (
                        <div className="invalid-feedback">
                          {errors.confirmNewPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col text-end">
                  <button className="btn primary-button" type="submit">
                    Change Password
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  changePassword: state.changePassword,
});

export default connect(mapStateToProps, {
  changePassword,
})(ChangePassword);
