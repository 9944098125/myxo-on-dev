import React, { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import "./UserAccount.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Col } from "react-bootstrap";
import { logout } from "../../Redux/Actions/loginAction";
import {
  updateTrainerAccount,
  updateRates,
} from "../../Redux/Actions/trainerAccountActions";
import {
  cover_image,
  profile_description,
} from "../../Redux/Actions/trainerProfileActions";
import ImageLayout from "../Common/ImageLayout";
import { Tabs, Tab } from "react-bootstrap";
import Alert from "../Modal/modal";
import LinkedAccounts from "../LinkedAccounts/LinkedAccounts";
import ProfileDescription from "../ProfileDescription/ProfileDescription";
import ChangePassword from "../ChangePassword/ChangePassword";
import timezone from "../Shared/timezone.json";
import { emailErrors, errorConstants, nameErrors, roles } from "../Shared/constants";

function UserAccount() {
  const LoginDetails = useSelector((state) => state.auth);

  // state hooks :
  const [selected, setSelected] = useState("");
  const [validateCountry, setValidateCountry] = useState(false);
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [disable, setDisable] = useState(false);

  //use state for form
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    timezone: "",
  });

  const sidePanel = useSelector((state) => state.sidePanel);
  const data = useSelector((state) => state.trainerProfile);
  //dispatch
  const dispatch = useDispatch();
  //Redux alert state
  const alert = useSelector((state) => state.alert);

  // UseEffects (start):
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
            address: data.userBio[0].address,
            timezone: data.userBio[0].time_zone,
          };
        });
      }
    }
  }, [data.userBio]);

  // navigate
  const navigate = useNavigate();

  // useEffect for showing alert message
  useEffect(() => {
    if (alert.type === "success_clear") {
      navigate("/user-profile");
    }
  }, [alert, navigate]);

  //on change for phone number
  const onChange = (value, data, event, formattedValue) => {
    setValue(value);
    setCode(data);
  };

  useEffect(() => {
    if (!value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
}, [value]);

  // validation
  const validate = (values, country) => {
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
        const locationData = {
          address: values.address,
          time_zone: values.timezone,
        };
        dispatch(updateTrainerAccount(id, apiData));
        dispatch(updateRates(id, locationData));
      } else {
        return;
      }
    } else {
      const apiData = {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        phone_code: "+" + data.userInfo[0].phone_code,
        phone_no: data.userInfo[0].phone_no,
        country: selected,
      };
      const locationData = {
        address: values.address,
        time_zone: values.timezone,
      };
      dispatch(updateTrainerAccount(id, apiData));
      dispatch(updateRates(id, locationData));
    }
  };

  // logout invalid users
  useEffect(() => {
    if (Number(LoginDetails.role_id) === roles.TRAINER_ROLE_ID) {
      dispatch(logout());
    }
  }, [LoginDetails, dispatch]);

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
                        {/* {JSON.stringify(touched, errors)}  */}
                        <div className="form-group mb-4">
                          <div className="main-heading2 my-3">
                            Personal Details
                          </div>
                          <div className="d-flex">
                            <Col>
                              <Col className="mb-4">
                                <label htmlFor="firstname" className="labels">
                                  First Name
                                </label>
                                <Field
                                  id="firstname"
                                  name="firstname"
                                  type="text"
                                  placeholder="Enter your first name"
                                  className={
                                    errors.firstname && touched.firstname
                                      ? "form-control is-invalid primary-input-field ta-inputs"
                                      : "form-control primary-input-field ta-inputs"
                                  }
                                />
                                {touched.firstname && errors.firstname ? (
                                  <div className="invalid-feedback">
                                    {errors.firstname}
                                  </div>
                                ) : null}
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="email" className="labels">
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
                                ) : null}
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="phone" className="labels">
                                  Phone number
                                </label>
                                <PhoneInput
                                  id="phone"
                                  isValid={(value, country) => {
                                    if (value.match(/^(?![\s\S])/)) {
                                      return "Phone number is required";
                                    } else if (
                                      value.substring(
                                        country.countryCode.length
                                      ) === ""
                                    ) {
                                      return "Enter Phone number";
                                    } else {
                                      return true;
                                    }
                                  }}
                                  country={"gb"}
                                  placeholder="Enter your phone number"
                                  value={value}
                                  onChange={onChange}
                                />
                              </Col>
                            </Col>
                            <Col className="ms-4">
                              <Col className="mb-4">
                                <label htmlFor="lastname" className="labels">
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
                                ) : null}
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="country" className="labels">
                                  Country
                                </label>
                                <div className="demo-wrapper">
                                  <ReactFlagsSelect
                                    selected={selected}
                                    onSelect={(code) => setSelected(code)}
                                    searchable={true}
                                  />
                                  {validateCountry ? (
                                    <div className="invalid-feedback1 invalid-country">
                                      Country name is required
                                    </div>
                                  ) : null}
                                </div>
                              </Col>
                              <Col className="mb-4">
                                <label htmlFor="timezone" className="labels">
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
                                    <option key={idx} value={idx}>
                                      {each.text}
                                    </option>
                                  ))}
                                </Field>
                                {touched.timezone && errors.timezone ? (
                                  <div className="invalid-feedback1">
                                    {errors.timezone}
                                  </div>
                                ) : null}
                              </Col>
                            </Col>
                            <Col className="ms-4">
                              <Col className="mb-4">
                                {/* address */}
                                <label htmlFor="address" className="labels">
                                  Address
                                </label>
                                <Field
                                  as="textarea"
                                  name="address"
                                  type="text"
                                  id="address"
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
                                ) : null}
                              </Col>
                            </Col>
                          </div>

                          <div className="d-flex flex-row justify-content-end mx-3 mt-3">
                            <button
                              type="submit"
                              className="btn primary-button"
                              disabled={
                                (Object.keys(errors).length === 0) && !disable ? false : true
                              }
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
})(UserAccount);
