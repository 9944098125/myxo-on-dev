import React, { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import {
  updateTrainerAccount,
  updateRates,
} from "../../Redux/Actions/trainerAccountActions";
import {
  cover_image,
  profile_description,
} from "../../Redux/Actions/trainerProfileActions";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Col } from "react-bootstrap";
import { logout } from "../../Redux/Actions/loginAction";
import Alert from "../Modal/modal";
import ImageLayout from "../Common/ImageLayout";
import { Tabs, Tab } from "react-bootstrap";
import LinkedAccounts from "../LinkedAccounts/LinkedAccounts";
import ProfileDescription from "../ProfileDescription/ProfileDescription";
import ChangePassword from "../ChangePassword/ChangePassword";
import timezone from "../Shared/timezone.json";
import { emailErrors, errorConstants, nameErrors, roles, levels } from "../Shared/constants";
import "./TrainerAccount.css";

function TrainerAccount() {
  const sidePanel = useSelector((state) => state.sidePanel);

  const [selected, setSelected] = useState("");
  const [validateCountry, setValidateCountry] = useState(false);
  // const [disable, setDisable] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    monthlySubscription: "",
    perClass: "",
    address: "",
    timezone: "",
    level: "",
  });
  const [value, setValue] = useState();
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  // const [submitting, setSubmitting] = useState(true);
  //Redux Dispatch:
  const dispatch = useDispatch();

  //Redux Selector:
  const alert = useSelector((state) => state.alert);
  const data = useSelector((state) => state.trainerProfile);
  const LoginDetails = useSelector((state) => state.auth);

  //React Router Navigate:
  const navigation = useNavigate();

  //UseEffects (start):
  useEffect(() => {
    if (data.userInfo) {
      if (data.userInfo[0]) {
        // updated values on form
        setFormValues((prevState) => {
          return {
            ...prevState,
            firstname: data.userInfo[0].first_name,
            lastname: data.userInfo[0].last_name,
            email: data.userInfo[0].email,
          };
        });

        //updated value for country
        setSelected(data.userInfo[0].country);
        if (data.userInfo[0].phone_code && data.userInfo[0].phone_no) {
          setValue(
            `${data.userInfo[0].phone_code}${data.userInfo[0].phone_no}`
          );
        }
      }
    }
  }, [data.userInfo]);

  useEffect(() => {
    if (data.userBio) {
      if (data.userBio[0]) {
        // update values on form
        setFormValues((prevState) => {
          return {
            ...prevState,
            monthlySubscription: data.userBio[0].monthly_pay,
            perClass: data.userBio[0].per_class_pay,
            address: data.userBio[0].address,
            timezone: data.userBio[0].time_zone,
            level: data.userBio[0].level,
          };
        });
      }
    }
  }, [data.userBio]);

  // useEffect(() => {
  //   if (value.length < 4) {
  //     setDisable(true)
  //   }else {
  //     setDisable(false)
  //   }
  // }, []);

  useEffect(() => {
    if (alert.type === "success_clear") {
      navigation("/trainer-profile");
    }
  }, [alert, navigation]);

  // console.log('roleId=>', LoginDetails.role_id, roles.USER_ROLE_ID)

  useEffect(() => {
    if (Number(LoginDetails.role_id) === roles.USER_ROLE_ID) {
      dispatch(logout());
    }
  }, [LoginDetails, dispatch]);
  // UseEffects (end):

  //On Change handlers(start):
  const onChange = (value, data, event, formattedValue) => {
    setValue(value);
    setCode(data);
  };


  // useEffect(() => {
  //     if (value < 999999) {
  //       setDisable(true);
  //     } else {
  //       setDisable(false);
  //     }
  // }, [value]);

  //   function phoneInValid() {
  //   setInvalid(true);
  // }

  // function phoneValid() {
  //   setInvalid(false);
  // }
  //On Change Handlers(end);

  //On Submit Handlers(start):
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = emailErrors.EMAIL;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = errorConstants.INVALID_EMAIL;
    }
    if (!values.firstname) {
      errors.firstname = nameErrors.FIRST_NAME;
    }
    if (!values.lastname) {
      errors.lastname = nameErrors.LAST_NAME;
    }
    if (!values.perClass) {
      errors.perClass = errorConstants.PER_CLASS;
    }
    if (!values.monthlySubscription) {
      errors.monthlySubscription = errorConstants.MONTHLY_SUBSCRIPTION;
    }
    if (!values.address) {
      errors.address = errorConstants.ADDRESS;
    }
    if (selected === "") {
      setValidateCountry(true);
      errors.selected = errorConstants.COUNTRY;
    }
    if (!values.timezone || values.timezone === "") {
      errors.timezone = errorConstants.TIMEZONE;
    }
    if (!values.level || values.level === "") {
      errors.level = errorConstants.LEVEL;
    }
    return errors;
  };

  const submitSuccess = (values) => {
    const id = localStorage.getItem("user_id");
    if (code) {
      const number = value.slice(code.dialCode.length);
      if (number !== "") {
        const apiData = {
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
          phone_code: "+" + code.dialCode,
          phone_no: number,
          country: selected,
        };
        const ratesData = {
          per_class_pay: values.perClass,
          monthly_pay: values.monthlySubscription,
          level: values.level,
          address: values.address,
          time_zone: values.timezone,
        };
        dispatch(updateTrainerAccount(id, apiData));
        dispatch(updateRates(id, ratesData));
      } else {
        return;
      }
      // setSubmitting(false);
    } else {
      const apiData = {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        phone_code: "+" + data.userInfo[0].phone_code,
        phone_no: data.userInfo[0].phone_no,
        country: selected,
      };
      const ratesData = {
        per_class_pay: values.perClass,
        monthly_pay: values.monthlySubscription,
        level: values.level,
        address: values.address,
        time_zone: values.timezone,
      };
      dispatch(updateTrainerAccount(id, apiData));
      dispatch(updateRates(id, ratesData));
      // setSubmitting(false);
    }
  };
  //On Submit Handlers(end):

  return (
    <>
      <div
        className={`page-wrapper ${
          sidePanel.toggle ? "sideClose" : "sideOpen"
        }`}
      >
        <div className="container">
          <Tabs
            defaultActiveKey="edit account details"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="edit account details" title="Account Details">
              <div className="p-4 mt-4">
                <div className="main-heading">Edit Account Details</div>
                <div>
                  <hr></hr>
                </div>
                <ImageLayout />
                <div className="ms-auto">
                  {alert.message && <Alert show={true} />}
                  <Formik
                    initialValues={formValues}
                    enableReinitialize
                    // validateOnChange={false}
                    // validateOnBlur={false}
                    validate={(values) => validate(values)}
                    onSubmit={(values) => submitSuccess(values)}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="form-group mb-4">
                          <div className="main-heading2 my-3">
                            Personal Details
                          </div>
                          <div className="d-flex">
                            <Col>
                              <div className="mb-4">
                                <label
                                  htmlFor="firstname"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <Field
                                  id="firstname"
                                  name="firstname"
                                  type="text"
                                  placeholder="Enter your first name"
                                  className={
                                    errors.firstname && touched.firstname
                                      ? "form-control is-invalid primary-input-field"
                                      : "form-control primary-input-field"
                                  }
                                />
                                {errors.firstname && touched.firstname ? (
                                  <div className="invalid-feedback">
                                    {errors.firstname}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <Col className="mb-4">
                                <label htmlFor="email" className="form-label">
                                  Email
                                </label>
                                <Field
                                  id="email"
                                  name="email"
                                  type="text"
                                  placeholder="Enter email"
                                  className={
                                    errors.email && touched.email
                                      ? "form-control primary-input-field is-invalid ta-inputs"
                                      : "form-control primary-input-field ta-inputs"
                                  }
                                />
                                {touched.email && errors.email ? (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="level" className="form-label">
                                  Level of instructor
                                </label>
                                <Field
                                  as="select"
                                  name="level"
                                  id="level"
                                  className="form-control primary-input-field dropdowns"
                                >
                                  <option value="">Select level</option>
                                  {levels.map((each, idx) => (
                                    <option value={each.value} key={idx}>
                                      {each.text}
                                    </option>
                                  ))}
                                </Field>
                                {touched.level && errors.level ? (
                                  <div className="invalid-feedback1">
                                    {errors.level}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Col>
                              <Col className="mb-4">
                                <label
                                  htmlFor="timezone"
                                  className="form-label"
                                >
                                  Time zone
                                </label>
                                <Field
                                  as="select"
                                  name="timezone"
                                  id="timezone"
                                  className="form-control primary-input-field dropdowns"
                                >
                                  <option defaultValue="" value="">
                                    Select Timezone
                                  </option>
                                  {timezone.map((each, idx) => (
                                    <option key={idx} value={each.utc}>
                                      {each.text}
                                    </option>
                                  ))}
                                </Field>
                                {touched.timezone && errors.timezone ? (
                                  <div className="invalid-feedback1">
                                    {errors.timezone}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Col>
                            </Col>
                            <Col className="ms-4">
                              <Col className="mb-4">
                                <label
                                  htmlFor="lastname"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <Field
                                  id="lastname"
                                  name="lastname"
                                  type="text"
                                  placeholder="Enter your last name"
                                  className={
                                    errors.lastname && touched.lastname
                                      ? "form-control primary-input-field is-invalid ta-inputs"
                                      : "form-control primary-input-field ta-inputs"
                                  }
                                />
                                {touched.lastname && errors.lastname ? (
                                  <div className="invalid-feedback">
                                    {errors.lastname}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="phone" className="form-label">
                                  Phone number
                                </label>
                                <PhoneInput
                                  id="phone"
                                  isValid={(value, country) => {
                                    if (value.match(/^(?![\s\S])/)) {
                                      // phoneInValid()
                                      return "Phone number is required";
                                    } else if (
                                      value.substring(
                                        country.countryCode.length
                                      ) === ""
                                    ) {
                                      // phoneInValid()
                                      return "Enter your Phone number";
                                    } else {
                                      // phoneValid()
                                      return true;
                                    }
                                  }}
                                  country={"gb"}
                                  placeholder="Enter your phone number"
                                  value={value}
                                  onChange={onChange}
                                />
                              </Col>
                              <Col className="mb-4">
                                <label
                                  htmlFor="country"
                                  className={
                                    invalid === true
                                      ? "form-label invalidMsg"
                                      : "form-label"
                                  }
                                >
                                  Country of origin
                                </label>
                                <div className="demo-wrapper">
                                  <ReactFlagsSelect
                                    id="country"
                                    selected={selected}
                                    onSelect={(code) => setSelected(code)}
                                    searchable={true}
                                  />
                                  {validateCountry ? (
                                    <div className="invalid-feedback1 invalid-country">
                                      {/* Country name is required */}
                                      {errors.selected}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Col>
                              <div className="d-flex flex-column mb-4">
                                {/* address */}
                                <label htmlFor="address" className="form-label">
                                  Address
                                </label>
                                <Field
                                  name="address"
                                  id="address"
                                  type="text"
                                  placeholder="Enter your address"
                                  className={
                                    errors.address && touched.address
                                      ? "form-control primary-input-field is-invalid ta-inputs"
                                      : "form-control primary-input-field ta-inputs"
                                  }
                                />
                                {touched.address && errors.address ? (
                                  <div className="invalid-feedback">
                                    {errors.address}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>

                            <Col className="ms-4">
                              <Col className="mb-4">
                                <div className="main-heading5">
                                  Update rates
                                </div>
                              </Col>
                              <div
                                className="d-flex l-mbl-view"
                                style={{ height: "200px" }}
                              >
                                <div className="vr"></div>

                                <div className="bg-lights">
                                  <div className="d-flex flex-column mb-4">
                                    <label
                                      htmlFor="perClass"
                                      className="form-label"
                                    >
                                      Per class
                                    </label>
                                    <div className="dollar-row">
                                      <div className="d-flex flex-column">
                                        <Field
                                          name="perClass"
                                          id="perClass"
                                          type="number"
                                          placeholder="per class"
                                          className={
                                            errors.perClass && touched.perClass
                                              ? "form-control primary-input-field is-invalid rates-inputs"
                                              : "form-control primary-input-field rates-inputs"
                                          }
                                        />
                                        {touched.perClass && errors.perClass ? (
                                          <div className="invalid-feedback">
                                            {errors.perClass}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <h3 className="dollar">$</h3>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-column mb-4">
                                    <label
                                      htmlFor="monthly"
                                      className="form-label"
                                    >
                                      Monthly subscription
                                    </label>
                                    <div className="dollar-row">
                                      <div className="d-flex flex-column">
                                        <Field
                                          name="monthlySubscription"
                                          type="number"
                                          id="monthly"
                                          placeholder="monthly subscription"
                                          className={
                                            errors.monthlySubscription &&
                                            touched.monthlySubscription
                                              ? "form-control primary-input-field is-invalid rates-inputs"
                                              : "form-control primary-input-field rates-inputs"
                                          }
                                        />
                                        {touched.monthlySubscription &&
                                        errors.monthlySubscription ? (
                                          <div className="invalid-feedback">
                                            {errors.monthlySubscription}
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <h3 className="dollar">$</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </div>

                          <div className="mt-3">
                            <div className="d-flex flex-column align-items-end">
                              <button
                                type="submit"
                                className="btn primary-button"
                                // disabled={
                                //   Object.keys(errors).length === 0 && !disable
                                //     ? false
                                //     : true
                                // }
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile description" title="Profile Description">
              <div className="pt-4 mt-4">
                <ProfileDescription />
              </div>
            </Tab>
            <Tab eventKey="linked accounts" title="Social Accounts">
              <div className="pt-4 mt-4">
                <LinkedAccounts />
              </div>
            </Tab>
            <Tab eventKey="change password" title="Change Password">
              <div className="pt-4 mt-4"></div>
              <ChangePassword />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  trainerAccount: state.trainerAccount,
});

export default connect(mapStateToProps, {
  updateTrainerAccount,
  profile_description,
  cover_image,
})(TrainerAccount);
