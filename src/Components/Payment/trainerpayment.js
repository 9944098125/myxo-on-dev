import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import ReactFlagsSelect from "react-flags-select";
import {
  addTrainerPayment,
  getTrainerPayment,
} from "../../Redux/Actions/trainerPayment";

function TrainerPayment(props) {
  //Global variable
  const role_id = localStorage.getItem("role_id");
  //props
  const { shows, toggle } = props;

  //State Hook:
  const [formValues, setFormValues] = useState({
    sortCode: "",
    accountNo: "",
    firstName: "",
    lastName: "",
    accountName: "",
    address: "",
    cityState: "",
  });
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");

  //Redux State:
  const state = useSelector((state) => state.trainerPayment);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //UseEffects (start):
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (Number(role_id) === 2) {
      dispatch(getTrainerPayment(id));
    }
  }, [shows, dispatch, role_id]);

  useEffect(() => {
    if (state !== 0) {
      setFormValues({
        sortCode: state.sort_code,
        accountNo: state.account_number,
        firstName: state.first_name,
        lastName: state.last_name,
        accountName: state.bank_name,
        address: state.address,
        cityState: state.city,
      });
      if (state.country !== "" || null) {
        setSelected(state.country);
      }
      if (state.phone_code && state.phone_number) {
        setValue(state.phone_code + state.phone_number);
      }
    }
  }, [state]);
  //UseEffects(end):

  //Validate (start):
  const validate = (values) => {
    const errors = {};
    if (!values.sortCode) {
      errors.sortCode = "Sort code is required";
    }
    if (!values.accountNo) {
      errors.accountNo = "Account number is required";
    }
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    return errors;
  };
  //Validate (end):

  //OnChangeHandlers (start):
  const onChange = (value, data, event, formattedValue) => {
    setValue(value);
    setCode(data);
  };

  const callSubmitApi = (values) => {
    if (Number(role_id) === 2) {
      // //user_id
      // const id = localStorage.getItem("user_id");
      // //split the phone number from code (+...),(+..),(+.)
      // if (code.format) {
      //   const data = code.format.split(" ")[0];
      //   if (data.length === 5) {
      //     const phn0 = value.slice(4);
      //     const apiData = {
      //       sort_code: values.sortCode,
      //       account_number: values.accountNo,
      //       phone_code: "+" + code.dialCode,
      //       phone_number: phn0,
      //       first_name: values.firstName,
      //       last_name: values.lastName,
      //       bank_name: values.accountName,
      //       address: values.address,
      //       city: values.cityState,
      //       country: selected,
      //     };
      //     dispatch(addTrainerPayment(id, apiData));
      //   } else if (data.length === 3) {
      //     const phn1 = value.slice(2);
      //     const apiData = {
      //       sort_code: values.sortCode,
      //       account_number: values.accountNo,
      //       phone_code: "+" + code.dialCode,
      //       phone_number: phn1,
      //       first_name: values.firstName,
      //       last_name: values.lastName,
      //       bank_name: values.accountName,
      //       address: values.address,
      //       city: values.cityState,
      //       country: selected,
      //     };
      //     dispatch(addTrainerPayment(id, apiData));
      //   } else if (data.length === 4) {
      //     const phn2 = value.slice(3);
      //     const apiData = {
      //       sort_code: values.sortCode,
      //       account_number: values.accountNo,
      //       phone_code: "+" + code.dialCode,
      //       phone_number: phn2,
      //       first_name: values.firstName,
      //       last_name: values.lastName,
      //       bank_name: values.accountName,
      //       address: values.address,
      //       city: values.cityState,
      //       country: selected,
      //     };
      //     dispatch(addTrainerPayment(id, apiData));
      //   } else {
      //     const phn3 = value.slice(1);
      //     const apiData = {
      //       sort_code: values.sortCode,
      //       account_number: values.accountNo,
      //       phone_code: "+" + code.dialCode,
      //       phone_number: phn3,
      //       first_name: values.firstName,
      //       last_name: values.lastName,
      //       bank_name: values.accountName,
      //       address: values.address,
      //       city: values.cityState,
      //       country: selected,
      //     };
      //     dispatch(addTrainerPayment(id, apiData));
      //   }
      // }
      const id = localStorage.getItem("user_id");
      if (code) {
        const number = value.slice(code.dialCode.length);
        if (number !== "") {
          const apiData = {
            sort_code: values.sortCode,
            account_number: values.accountNo,
            phone_code: "+" + code.dialCode,
            phone_number: number,
            first_name: values.firstName,
            last_name: values.lastName,
            bank_name: values.accountName,
            address: values.address,
            city: values.cityState,
            country: selected,
          };
          dispatch(addTrainerPayment(id, apiData));
        } else {
          return;
        }
      } else {
        const apiData = {
          sort_code: values.sortCode,
          account_number: values.accountNo,
          phone_code: state.phone_code,
          phone_number: state.phone_number,
          first_name: values.firstName,
          last_name: values.lastName,
          bank_name: values.accountName,
          address: values.address,
          city: values.cityState,
          country: selected,
        };
        dispatch(addTrainerPayment(id, apiData));
      }
    }
    toggle();
  };
  //OnChangeHandlers (end):

  return (
    <Modal show={shows} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>
          {/* heading */}
          <div className="row">
            <div className="col borders mx-4">
              <span className="small-heading">
                Set up payments: Direct to local bank
              </span>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-4">
        <div className="text-44 mb-3">Bank information</div>
        <Formik
          initialValues={formValues}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          validate={(values) => validate(values)}
          onSubmit={(values) => {
            callSubmitApi(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* sort code */}
              <div className="form-group mb-4">
                <label htmlFor="sortCode" className="">
                  Sort code
                </label>
                <Field
                  name="sortCode"
                  type="text"
                  placeholder="Enter sort code"
                  className={
                    errors.sortCode && touched.sortCode
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.sortCode && errors.sortCode ? (
                  <div className="invalid-feedback">{errors.sortCode}</div>
                ) : null}
              </div>
              {/* account number */}
              <div className="form-group mb-4">
                <label htmlFor="accountNo" className="">
                  Account number
                </label>
                <Field
                  name="accountNo"
                  type="text"
                  placeholder="Enter account number"
                  className={
                    errors.accountNo && touched.accountNo
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.accountNo && errors.accountNo ? (
                  <div className="invalid-feedback">{errors.accountNo}</div>
                ) : null}
              </div>
              {/* first name */}
              <div className="form-group mb-4">
                <label htmlFor="firstName" className="">
                  First name
                </label>
                <div className="input-group">
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className={
                      errors.firstName && touched.firstName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {touched.firstName && errors.firstName ? (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              {/* last name */}
              <div className="form-group mb-4">
                <label htmlFor="lastName" className="">
                  Last name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className={
                    errors.lastName && touched.lastName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.lastName && errors.lastName ? (
                  <div className="invalid-feedback">{errors.lastName}</div>
                ) : null}
              </div>
              {/* name an account */}
              <div className="form-group mb-4">
                <label htmlFor="accoutName" className="">
                  Name of account
                </label>
                <Field
                  name="accountName"
                  type="text"
                  placeholder="Enter name of account"
                  className={
                    errors.accountName && touched.accountName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.accountName && errors.accountName ? (
                  <div className="invalid-feedback">{errors.accountName}</div>
                ) : null}
              </div>
              {/* address */}
              <div className="form-group mb-4">
                <label htmlFor="address" className="">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  className={
                    errors.address && touched.address
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.address && errors.address ? (
                  <div className="invalid-feedback">{errors.address}</div>
                ) : null}
              </div>
              {/* city, state, province */}
              <div className="form-group mb-4">
                <label htmlFor="cityState" className="">
                  City and State/Province
                </label>
                <Field
                  name="cityState"
                  type="text"
                  placeholder="Enter city and state/Province"
                  className={
                    errors.cityState && touched.cityState
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {touched.cityState && errors.cityState ? (
                  <div className="invalid-feedback">{errors.cityState}</div>
                ) : null}
              </div>
              {/* country */}
              <div className="form-group mb-4">
                <div className="demo-wrapper">
                  <label htmlFor="country" className="">
                    Country
                  </label>
                  <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                    searchable={true}
                  />
                </div>
              </div>
              {/* phone number */}
              <div className="form-group mb-4">
                <label htmlFor="phoneNo" className="">
                  Phone number
                </label>
                <PhoneInput
                  country={"gb"}
                  isValid={(value, country) => {
                    if (value.match(/^(?![\s\S])/)) {
                      return "Phone number is required";
                    } else if (
                      value.substring(country.countryCode.length) === ""
                    ) {
                      return "Enter Phone number";
                    } else {
                      return true;
                    }
                  }}
                  value={value}
                  onChange={onChange}
                  className="form-control"
                  placeholder={"Enter your phone number"}
                />
              </div>

              {/* action buttons */}
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <button type="button" className="btn secondary-button">
                      Back
                    </button>
                  </div>
                  <div className="col text-end">
                    <button type="submit" className="btn primary-button">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  trainerPayment: state.trainerPayment,
});

export default connect(mapStateToProps, {
  addTrainerPayment,
  getTrainerPayment,
})(TrainerPayment);