import React, { useState, useEffect } from "react";
import "../Registration/Registration.css";
import myxo from "../../Assets/Images/myxo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ReactFlagsSelect from "react-flags-select";
import { register } from "../../Redux/Actions/signupAction";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import Alert from "../Modal/modal";
import Loader from "../Loader/loader";

function Registration(props) {
  //Use State:
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [validateCountry, setValidateCountry] = useState(false);

  //Used to change the routes:
  const navigate = useNavigate();

  //Redux State:
  const alert = useSelector((state) => state.alert);
  const signUp = useSelector((state) => state.sigup);

  //UseEffects (start):
  useEffect(() => {
    if (alert.type === "success_clear") {
      navigate("/");
    }
  }, [alert, navigate]);
  //UseEffects (end):

  //Validate (start):
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .matches(/^(?!\s$)/, "First name field cannot be empty"),
    last_name: Yup.string()
      .required("Last name is required")
      .matches(/^(?!\s$)/, "Last name field cannot be empty"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
        " Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" // eslint-disable-line
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password must match"
      ),
  });
  // Validate (end):

  //Component State:
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    country: "",
  };

  //OnChangeHandlers (start):
  const togglePassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  const togglePassword1 = () => {
    setShowPassword1(showPassword1 ? false : true);
  };

  const onChange = (value, data, event, formattedValue) => {
    setValue(value);
    setCode(data.dialCode);
  };

  const callRegisterApi = (values) => {
    const phoneNo = value && value.slice(2);
    const phoneCode = "+"+code;
    if(selected === ""){
      setValidateCountry(true);
    }
    else{
      setValidateCountry(false);
      props.register(values, phoneCode, phoneNo, selected, active);
    }
  };
  //onChangeHandlers (end):

  return (
    <div>
      <div className="lightTheme">
        <div className="container-fluid background-image">
          <div className="row no-gutter board">
            <div className="col-md-5 bg2">
              <div className="mt-5">
                <Link to="/">
                  <img src={myxo} alt="logo" />
                </Link>
              </div>

              <div className="box1">
                <h1 className="main-title1">Sign Up to</h1>
                <h1 className="main-title1">Start Workingout</h1>

                <div className="mt-5">
                  <span className="text-2">
                    If you have an account already{" "}
                    <Link to="/" className="link">
                      Sign In
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-7 image2">
              <div className="d-flex align-items-center py-5">
                <div className="container">
                  <div className="top-section row">
                    <div className="col" id="show">
                      <img src={myxo} alt="logo" />
                    </div>

                  <div className="d-flex justify-content-end">
                    <div className="mx-2">
                      <Link to="/" className="link1">
                        Sign In
                      </Link>
                    </div>

                    <div className="mx-2">
                      <span className="text-3">Register</span>
                    </div>
                  </div>
                  </div>

                  <div className="row mt-5">
                    <div className="ms-auto glass-effect p-3">
                      {alert.message && <Alert show={true} />}
                      <div className="select-section row selection mb-2">
                        <span className="text-4 col text-center">I am a</span>
                        <span
                          className={
                            active
                              ? "text-6 col text-center"
                              : "text-5 col text-center"
                          }
                          onClick={() => {
                            setActive(true);
                          }}
                        >
                          Trainer
                        </span>
                        <span
                          className={
                            active
                              ? "text-5 col text-center"
                              : "text-6 col text-center"
                          }
                          onClick={() => {
                            setActive(false);
                          }}
                        >
                          User
                        </span>
                      </div>

                      <div className="form-section mt-4">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          validateOnChange={false}
                          validateOnBlur={false}
                          onSubmit={(values) => {
                            callRegisterApi(values);
                          }}
                        >
                          {({ errors, touched }) => (
                            <Form>
                              <div className="row">
                                <div className="col-md">
                                  <div className="form-group mb-4">
                                    {/* first name */}
                                    <Field
                                      type="text"
                                      id="first_name"
                                      name="first_name"
                                      placeholder="Enter your first name"
                                      className={
                                        errors.first_name && touched.first_name
                                          ? "form-control primary-input-field is-invalid"
                                          : "form-control primary-input-field"
                                      }
                                    />
                                    {touched.first_name && errors.first_name ? (
                                      <div className="invalid-feedback">
                                        {errors.first_name}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-md">
                                  <div className="form-group mb-4">
                                    {/* last name */}
                                    <Field
                                      type="text"
                                      id="last_name"
                                      name="last_name"
                                      placeholder="Enter Your last name"
                                      className={
                                        errors.last_name && touched.last_name
                                          ? "form-control primary-input-field is-invalid"
                                          : "form-control primary-input-field"
                                      }
                                    />
                                    {touched.last_name && errors.last_name ? (
                                      <div className="invalid-feedback">
                                        {errors.last_name}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md">
                                  <div className="form-group mb-4">
                                    {/* email */}
                                    <Field
                                      type="text"
                                      id="email"
                                      name="email"
                                      placeholder="Enter your email address"
                                      className={
                                        errors.email && touched.email
                                          ? "form-control primary-input-field is-invalid"
                                          : "form-control primary-input-field"
                                      }
                                    />
                                    {touched.email && errors.email ? (
                                      <div className="invalid-feedback">
                                        {errors.email}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group mb-4">
                                    {/* phone number */}
                                    <PhoneInput
                                      country={"gb"}
                                      isValid={(value) => {
                                        if (value.match(/^(?![\s\S])/)) {
                                          return "Phone number is required";
                                        } else {
                                          return true;
                                        }
                                      }}
                                      value={value}
                                      onChange={onChange}
                                      placeholder={"Enter your phone number"}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md">
                                  <div className="form-group mb-4">
                                    <div className="input-group">
                                      {/* password */}
                                      <Field
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className={
                                          errors.password && touched.password
                                            ? "form-control primary-input-field is-invalid pass"
                                            : "form-control primary-input-field pass"
                                        }
                                      />
                                      <span
                                        className="input-group-text"
                                        id="basic-addon2"
                                        onClick={togglePassword}
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
                                      {touched.password && errors.password ? (
                                        <div className="invalid-feedback">
                                          {errors.password}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md">
                                  <div className="form-group mb-4">
                                    <div className="input-group">
                                      {/* confirm-password */}
                                      <Field
                                        type={
                                          showPassword1 ? "text" : "password"
                                        }
                                        id="confirm_password"
                                        name="confirm_password"
                                        placeholder="Re-enter your password"
                                        className={
                                          errors.confirm_password &&
                                          touched.confirm_password
                                            ? "form-control primary-input-field is-invalid pass"
                                            : "form-control primary-input-field pass"
                                        }
                                      />
                                      <span
                                        className="input-group-text"
                                        id="basic-addon2"
                                        onClick={togglePassword1}
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
                                      {touched.confirm_password &&
                                      errors.confirm_password ? (
                                        <div className="invalid-feedback">
                                          {" "}
                                          {errors.confirm_password}{" "}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="demo-wrapper">
                                    {/* country */}
                                    <ReactFlagsSelect
                                      selected={selected}
                                      onSelect={(code) => setSelected(code)}
                                      searchable={true}
                                    />
                                    {validateCountry ? (
                                      <div className="invalid-feedback1 invalid-country">
                                        Country name is required
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="form-group text-center">
                                <button
                                  className="btn primary-button btn5"
                                  type="submit"
                                >
                                  {signUp.loading ? (
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
                                    <span>Sign Up</span>
                                  )}
                                </button>
                              </div>
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
  );
}

const mapStateToProps = (state) => ({
  sigup: state.sigup,
});

export default connect(mapStateToProps, { register })(Registration);
