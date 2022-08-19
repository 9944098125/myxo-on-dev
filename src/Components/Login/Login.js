import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import myxo from "../../Assets/Images/myxo.png";
import { Link, useSearchParams } from "react-router-dom";
import googleImage from "../../Assets/Images/icons8-google 1.png";
import fbImage from "../../Assets/Images/icons8-facebook 1.png";
import { Formik, Form, Field } from "formik";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  login,
  googleLogin,
  facebookLogin,
} from "../../Redux/Actions/loginAction";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Alert from "../Modal/modal";
import Loader from "../Loader/loader";
import { alertActions } from "../../Redux/Actions/alertActions";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { emailErrors, passwordErrors } from "../Shared/constants";

function Login(props) {
  // Redux State:
  const LoginDetails = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  // Component State:
  const initialValues = {
    email: "",
    password: "",
  };

  //Use State
  const [userData, setUserData] = useState({
    userType: "User",
    showPassword: false,
  });

  // Used to change the routes:
  const Navigator = useNavigate();

  //React Param:
  const [data] = useSearchParams();

  //Redux Dispatch
  const dispatch = useDispatch();

  // UseEffects (start):
  // Need to check weather it required or not
  useEffect(() => {
    //console.log(LoginDetails)
    if (LoginDetails.isAuthenticated && LoginDetails.role_id === 2) {
      // return Navigator("/sidemenu");
      return Navigator("/trainer-profile");
    } else if (LoginDetails.isAuthenticated && LoginDetails.role_id === 3) {
      return Navigator("/user-profile");
    }
  }, [LoginDetails.isAuthenticated, LoginDetails.role_id, Navigator]);

  useEffect(() => {
    if (
      data.get("emailNotification") === 1 ||
      data.get("emailNotification") === "1"
    ) {
      dispatch(
        alertActions.success("Your email has been successfully verified.")
      );
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
    // console.log(alert.type);
  }, [data, dispatch]);
  // UseEffects (end):

  // onChangeHandlers (start):
  const changeloginType = (value) => {
    const oldData = { ...userData };
    oldData.userType = value;
    setUserData(oldData);
  };

  const togglePassword = () => {
    const oldData = { ...userData };
    oldData.showPassword = !oldData.showPassword;
    setUserData(oldData);
  };

  const callLoginApi = (values) => {
    const apiData = {
      email: "",
      phone: "",
      password: "",
    };
    if (values) {
      apiData.password = values.password;
      if (isNaN(values.email)) {
        // if isNan means if there it is not a numeric value
        apiData.email = values.email;
      } else {
        apiData.phone = values.email;
      }
    }
    props.login(apiData);
  };

  const googleLogin = (response) => {
    // console.log(response);
    const googleRes = response.profileObj;
    if (googleRes) {
      const apiData = {
        email: googleRes.email && googleRes.email,
        last_name: googleRes.familyName && googleRes.familyName,
        first_name: googleRes.givenName && googleRes.givenName,
        google_id: googleRes.googleId && googleRes.googleId,
        role_id: userData.userType === "Trainer" ? "2" : "3",
      };
      props.googleLogin(apiData);
    }
  };

  const googleLoginFailure = (response) => {
    //console.log(response);
  };

  const facebookLogin = (response) => {
    if (response) {
      const apiData = {
        email: response.email && response.email,
        last_name:
          response.name && response.name.split(" ").slice(-1).join(" "),
        first_name:
          response.name && response.name.split(" ").slice(0, -1).join(" "),
        facebook_id: response.id && response.id,
        role_id: userData.userType === "Trainer" ? "2" : "3",
      };
      props.facebookLogin(apiData);
    }
  };
  // onChangeHandlers (end):

  // Validations (start):
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = emailErrors.EMAIL
    } else if (isNaN(values.email)) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //eslint-disable-line
        errors.email = emailErrors.INVALID_EMAIL
      }
    }
    if (!values.password) {
      errors.password = passwordErrors.PASSWORD
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
        //eslint-disable-line
        values.password
      )
    ) {
      errors.password =
      passwordErrors.PASSWORD_INVALID
    }
    return errors;
  };
  // !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  // Validations (end):

  return (
    <Fragment>
      <div className="container-fluid image">
        <div className="lightTheme">
          <div className="row no-gutter board">
            <div className="col-md-6 bg2">
              <div className="mt-5">
                <img src={myxo} alt="logo" />
              </div>
              <div className="box1">
                <h1 className="main-title1">Sign In to</h1>
                <h1 className="main-title1">Start Workingout</h1>

                <div className="mt-5">
                  <span className="text-2">If you don’t have an account</span>
                  <br></br>
                  <br></br>
                  <span className="text-2">
                    You can{" "}
                    <Link to="/registration" className="link">
                      Register here!
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center py-5">
                <div className="container">
                  <div className="top-section row">
                    <div className="col" id="show">
                      <img src={myxo} alt="logo" />
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="mx-2">
                        <span className="text-3">Sign In</span>
                      </div>
                      <div className="mx-2">
                        <Link to="/registration" className="link1">
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-lg-12 col-xl-8 ms-auto glass-effect p-3">
                      <div className="select-section row mx-auto">
                        <span className="text-4 col text-center">I am a</span>
                        <span
                          className={
                            userData.userType === "Trainer"
                              ? "text-6 col text-center"
                              : "text-5 col text-center"
                          }
                          onClick={() => changeloginType("Trainer")}
                        >
                          Trainer
                        </span>
                        <span
                          className={
                            userData.userType === "User"
                              ? "text-6 col text-center"
                              : "text-5 col text-center"
                          }
                          onClick={() => changeloginType("User")}
                        >
                          User
                        </span>
                      </div>

                      {alert.message && <Alert show={true} />}

                      <div className="form-section mt-4">
                        <Formik
                          initialValues={initialValues}
                          validateOnChange={false}
                          validateOnBlur={false}
                          validate={(values) => validate(values)}
                          onSubmit={(values) => {
                            callLoginApi(values);
                          }}
                        >
                          {({ errors, touched }) => (
                            <Form>
                              {/* email field */}
                              <div className="form-group mb-4">
                                <Field
                                  name="email"
                                  type="text"
                                  placeholder="Enter email or phone number"
                                  className={
                                    errors.email && touched.email
                                      ? "form-control login-input-field is-invalid"
                                      : "form-control login-input-field"
                                  }
                                />
                                {touched.email && errors.email ? (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </div>

                              {/* password field */}
                              <div className="form-group mb-5">
                                <div className="input-group">
                                  <Field
                                    name="password"
                                    type={
                                      userData.showPassword
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder="Enter password"
                                    className={
                                      errors.password && touched.password
                                        ? "form-control login-input-field is-invalid"
                                        : "form-control login-input-field pass"
                                    }
                                  />
                                  {/* eye icon */}
                                  <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                    onClick={togglePassword}
                                  >
                                    {userData.showPassword ? (
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
                                  {touched.password && errors.password ? (
                                    <div className="invalid-feedback">
                                      {errors.password}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {/* submit button */}
                              <div className="form-group col">
                                <button
                                  className="btn primary-button btn4"
                                  type="submit"
                                >
                                  {LoginDetails.loading ? (
                                    <div className="row align-items-center">
                                      <div
                                        className="col-5"
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        <Loader />
                                      </div>
                                      <div className="col text-start">
                                        Sign in
                                      </div>
                                    </div>
                                  ) : (
                                    <span>Sign in</span>
                                  )}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>

                        <ForgotPassword />

                        <div className="strike mt-4">
                          <span className="small-text-1">or continue with</span>
                        </div>
                        <div className="button-section row mt-4">
                          <div style={{ width: "50%" }}>
                            {/* Google login */}
                            <GoogleLogin
                              // clientId="917294848072-gkngbtokv0b9slril5j8qqvdf6istace.apps.googleusercontent.com"
                              clientId="823827507140-91ge0lvun7ihvd27vgvm3k8nb03bmo6j.apps.googleusercontent.com"
                              render={(renderProps) => (
                                <button
                                  className="col btn btn-social m-2"
                                  onClick={renderProps.onClick}
                                >
                                  <img src={googleImage} alt="google_link" />
                                </button>
                              )}
                              onSuccess={googleLogin}
                              onFailure={googleLoginFailure}
                              cookiePolicy={"single_host_origin"}
                            />
                          </div>
                          <div style={{ width: "50%" }}>
                            {/* facebook login */}
                            <FacebookLogin
                              appId="629808441477069"
                              autoLoad={false}
                              callback={facebookLogin}
                              fields="name,email,id"
                              render={(renderProps) => (
                                <button
                                  className="col btn btn-social m-2"
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                >
                                  <img src={fbImage} alt="fb_link" />
                                </button>
                              )}
                            />
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
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  LoginDetails: state.auth,
});

export default connect(mapStateToProps, { login, googleLogin, facebookLogin })(
  Login
);
