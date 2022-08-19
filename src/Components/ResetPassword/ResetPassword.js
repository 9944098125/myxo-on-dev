import React, { Fragment, useState, useEffect } from "react";
import myxo from "../../Assets/Images/myxo.png";
import { Field, Formik, Form } from "formik";
import { updatePassword } from "../../Redux/Actions/resetPasswordAction";
import "./ResetPassword.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import { passwordErrors } from "../Shared/constants";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router";
import { verifyToken } from "../../Redux/Actions/resetPasswordAction";
import Alert from "../Modal/modal";
import jwtDecode from "jwt-decode";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let urlToken;
  let decodedTokenEmail;

  //fetching token from url params
  const queryParams = new URLSearchParams(window.location.search);
  urlToken = queryParams.get("token");

  //decoding token and extracting email from it
  if(urlToken !== null) {
    const decodedToken = jwtDecode(urlToken);
    decodedTokenEmail = decodedToken.email;
  } else {
    decodedTokenEmail = null;
  }
  
  const initValues = {
    resetPassword: "",
    confirmPassword: "",
  };
  
  //Redux Dispatch:
  const dispatch = useDispatch();

  //navigation hook, Used to navigate 
  const navigation = useNavigate();

  //Redux State:
  const resetPasswordResponse = useSelector((state) => state.resetPasswordReducer);
  const alert = useSelector((state) => state.alert);

  //submit handler
  function handleSubmit(values) {
     const data = {
       password: values.resetPassword,
       confirm_password: values.confirmPassword
     }
    dispatch(updatePassword(decodedTokenEmail, data));
  }

  //toggles
  function switchShowPassword() {
    setShowPassword(!showPassword);
  }

  function switchShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  // Validations (start):
  const validate = (values) => {
    const errors = {};
    if (values.resetPassword === "") {
      errors.resetPassword = passwordErrors.PASSWORD
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
        values.resetPassword
      )
    ) {
      errors.resetPassword =
      passwordErrors.PASSWORD_INVALID
    }
    if (values.confirmPassword === "") {
      errors.confirmPassword = passwordErrors.CONFIRM_PASSWORD
    } else if (values.confirmPassword !== values.resetPassword) {
      errors.confirmPassword = passwordErrors.PASSWORDS_UNMATCHED
    }
    return errors;
  };
  // Validations (end)

  // UseEffects (start):
  useEffect(() => {
    dispatch(verifyToken(urlToken))
  },[])

  useEffect(() => {
    if(alert.type === "error_clear") {
      navigation("/");
    } else if (alert.type === "success_clear" && resetPasswordResponse.response === "Password updated successfully") {
      navigation("/");
    }
  },[alert, navigation, resetPasswordResponse.response])
  // UseEffects (end):

  return (
    <Fragment>
      <div className="container-fluid image">
        <div className="lightTheme">
          {/* alert */}
          {alert.message && <Alert show={true} />}
          <div className="row no-gutter board">
              <div className="col-md-6 bg2">
                <div className="mt-5">
                  <img src={myxo} alt="logo" />
                </div>
                <div className="box1">
                  <h1 className="main-title1">Reset your password here</h1>
                  <h1 className="main-title1">And Login</h1>

                  <div className="mt-5">
                    <span className="text-2">
                      If you remember your password
                    </span>
                    <br></br>
                    <br></br>
                    <span className="text-2">
                      You can{" "}
                      <Link to="/" className="link">
                        Login here!
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row mt-5">
                      <div className="top-section row">
                        <div className="col" id="show">
                          <img src={myxo} alt="logo" />
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="ms-auto col-xl-8 col-lg-12 glass-effect p-3">
                          <div className="form-section mt-4">
                            <Formik
                              initialValues={initValues}
                              validate={(values) => validate(values)}
                              onSubmit={(values, {resetForm}) => { handleSubmit(values);
                                                                  resetForm(); }}
                            >
                              {({ errors, touched }) => (
                                <Form>
                                  {/* <h3 className="reset-head text-center">
                                    Reset Password
                                  </h3> */}
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group mb-4">
                                        <label
                                          htmlFor="resetPassword"
                                          className="reset-label"
                                        >
                                          Password
                                        </label>
                                        <div className="input-group">
                                          <Field
                                            type={showPassword ? "text" : "password"}
                                            id="resetPassword"
                                            name="resetPassword"
                                            placeholder="Enter your New password"
                                            className={
                                              errors.resetPassword &&
                                              touched.resetPassword
                                                ? "form-control login-input-field is-invalid"
                                                : "form-control login-input-field pass"
                                            }
                                          />
                                          <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                            onClick={switchShowPassword}
                                          >
                                            {showPassword ? (
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
                                          {touched.resetPassword &&
                                          errors.resetPassword ? (
                                            <div className="invalid-feedback">
                                              {errors.resetPassword}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group mb-4">
                                        <label
                                          htmlFor="confirmPassword"
                                          className="reset-label"
                                        >
                                          Confirm Password
                                        </label>
                                        <div className="input-group">
                                          <Field
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            className={
                                              errors.confirmPassword &&
                                              touched.confirmPassword
                                                ? "form-control login-input-field is-invalid"
                                                : "form-control login-input-field pass"
                                            }
                                          />
                                          <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                            onClick={switchShowConfirmPassword}
                                          >
                                            {showConfirmPassword ? (
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
                                          {touched.confirmPassword &&
                                          errors.confirmPassword ? (
                                            <div className="invalid-feedback">
                                              {errors.confirmPassword}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn primary-button btn4 mt-3"
                                  >
                                    Submit
                                  </button>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// export default ResetPassword;

const mapStateToProps = (state) => ({
  resetPassword: state.resetPasswordReducer,
})

export default connect(mapStateToProps, {
  verifyToken, updatePassword
})(ResetPassword);