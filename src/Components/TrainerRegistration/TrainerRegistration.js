import React, { useState } from "react";
import "./TrainerRegistration.css";
import myxo from "../../Assets/Images/myxo.png";
import fb from "../../Assets/Images/social-facebook.svg";
import insta from "../../Assets/Images/Union.svg";
import twitter from "../../Assets/Images/Vector.svg";
import themeIcon from "../../Assets/Images/sun.svg";
import angelDownImage from "../../Assets/Images/angle-down-small1.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function TrainerRegistration() {
  const [active, setActive] = useState(false);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .matches(/^(?!\s$)/, "First name cannot be empty"),
    last_name: Yup.string()
      .required("Last name is required")
      .matches(/^(?!\s$)/, "Last name cannot be empty"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    country: Yup.string().required("Choose country of origin"),
    level: Yup.string().required("Choose level of instructor"),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    level: "",
  };

  return (
    <div>
      <div className={active ? "darkTheme" : "lightTheme"}>
        <div className="container-fluid background">
          <div className="row board">
            <div className="col-md-5 bg1">
              <div className="mt-5">
                <img src={myxo} alt="myxo_logo" />
                <img
                  src={themeIcon}
                  alt="theme_icon"
                  onClick={() => {
                    setActive(!active);
                  }}
                />
              </div>

              <div className="box">
                <h1 className="main-title">
                  You are one step closer to start making money as a trainer
                </h1>

                <div className="mt-5">
                  <p className="text-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc.
                  </p>
                </div>

                <div className="share-section">
                  <p>Share</p>
                  <img src={fb} alt="facebook" className="links" />
                  <img src={insta} alt="instagram" className="links" />
                  <img src={twitter} alt="twitter" className="links" />
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="mt-3" id="show">
                <img src={myxo} alt="myxo_logo" />
              </div>
              <div className="mt-5">
                <div className="line">
                  <h4 className="main-title mx-2">
                    Let’s set your trainer profile
                  </h4>
                </div>

                <div className="forms mt-4">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="containers">
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="first_name"
                                  className="small-text"
                                >
                                  First name
                                </label>
                                <Field
                                  name="first_name"
                                  type="text"
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
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  htmlFor="last_name"
                                  className="small-text"
                                >
                                  Last name
                                </label>
                                <Field
                                  name="last_name"
                                  type="text"
                                  placeholder="Enter your last name"
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
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email" className="small-text">
                                  Email
                                </label>
                                <Field
                                  name="email"
                                  type="email"
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
                              <div className="form-group">
                                <label htmlFor="country" className="small-text">
                                  Country of origin
                                </label>
                                <Field
                                  name="country"
                                  as="select"
                                  multiple={false}
                                  className={
                                    errors.country && touched.country
                                      ? "form-control is-invalid dropdownMenuButton1"
                                      : "form-control dropdownMenuButton1 icon"
                                  }
                                >
                                  <option value="''">Choose country</option>
                                  <option value="react">React</option>
                                  <option value="ng">Angular</option>
                                  <option value="vue">Vue</option>
                                </Field>
                                {touched.country && errors.country ? (
                                  <div className="invalid-feedback">
                                    {errors.country}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="level" className="small-text">
                                  Level of instructor
                                </label>
                                <Field
                                  name="level"
                                  as="select"
                                  multiple={false}
                                  className={
                                    errors.level && touched.level
                                      ? "form-control is-invalid dropdownMenuButton1"
                                      : "form-control dropdownMenuButton1 icon"
                                  }
                                >
                                  <option value="''">Choose level</option>
                                  <option value="react">React</option>
                                  <option value="ng">Angular</option>
                                  <option value="vue">Vue</option>
                                </Field>
                                {touched.level && errors.level ? (
                                  <div className="invalid-feedback">
                                    {errors.level}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="small-text">
                                  Phone number
                                </label>
                                <div className="input-group mb-3">
                                  <button
                                    className="btn dropdown-toggle drp"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    +1
                                    <img
                                      src={angelDownImage}
                                      alt="angle-down"
                                    />
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li className="dropdown-item">Action</li>
                                    <li className="dropdown-item">Action</li>
                                    <li className="dropdown-item">Action</li>
                                    <li className="dropdown-item">Action</li>
                                  </ul>
                                  <input
                                    type="text"
                                    className="form-control drpIn"
                                    placeholder="(___)___ ____"
                                    aria-label="Text input with dropdown button"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line">
                            <h4 className="main-title mx-2">Set your rates</h4>
                          </div>
                          <div className="mt-2">
                            <span className="small-text">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Scelerisque.
                            </span>
                          </div>
                          <div className="row mb-4 mt-3">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label className="small-text-2">
                                  Per class
                                </label>
                                <input
                                  type="text"
                                  className="form-control secondary-input-field price-field"
                                />
                              </div>
                            </div>
                            <div className="col-md">
                              <div className="form-group">
                                <label className="small-text-2">
                                  Monthly subscription
                                </label>
                                <input
                                  type="text"
                                  className="form-control secondary-input-field price-field"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col-md-4">
                              <button
                                className="btn primary-button btn-sm btn1 m-2"
                                type="submit"
                              >
                                Save and continue
                              </button>
                            </div>
                            <div className="col-md">
                              <button
                                className="btn secondary-button btn-sm btn2 m-2"
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
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
  );
}

export default TrainerRegistration;
