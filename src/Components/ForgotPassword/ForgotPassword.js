import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { sendMail } from "../../Redux/Actions/forgotPasswordAction";
import {useDispatch, useSelector, connect} from 'react-redux';
import Alert from "../Modal/modal";

import "./ForgotPassword.css";
import { emailErrors } from "../Shared/constants";

function ForgotPassword(props) {
  const [showModal, setShowModal] = useState(false);
  
  const alert = useSelector((state) => state.alert);
  // const sendMail = useSelector((state) => state.sendMail);
  const dispatch = useDispatch();

  function shutModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const initialValues = {
    email: "",
  };

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
    return errors;
  };
  // Validations (end):

  function handleSubmit(values) {
    // event.preventDefault();
    const data = {
      email:"",
    }
    if (values) {
      data.email = values.email
    }
    dispatch(sendMail(data));
    shutModal();
  }

  return (
    <Fragment>
      <div className="d-flex flex-row justify-content-end mt-2">
        <small onClick={openModal} className="forgot">
          Forgot Password ?
        </small>
      </div>
      {alert.message &&  <Alert show={true}/>}
      {showModal ? (
        <Modal show={showModal} size="md" centered onHide={shutModal}>
          <div className="p-4">
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="row">
                    <h3 className="forgot-head">Reset Password</h3>
                  </div>
                </Modal.Title>
              </Modal.Header>
            <p className="para">Give your email to reset your password</p>
            <Formik
              initialValues={initialValues}
              validate={(values) => validate(values)}
              onSubmit={(values, {resetForm})=> {handleSubmit(values);
                                                resetForm();
                                              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mb-4">
                    <label className="label">E-mail</label>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter your email address..."
                      className={
                        errors.email && touched.email
                          ? "form-control login-input-field is-invalid"
                          : "form-control login-input-field"
                      }
                    />
                    {touched.email && errors.email ? (
                      <div className="invalid-feedback">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="d-flex flex-row ms-4 mt-5">
                    <button
                      className="btn primary-button btn4 me-4"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      ) : null}
    </Fragment>
  );
}
// export default ForgotPassword

const mapStateToProps = (state) => ({
  forgotPasswordReducer: state.forgotPasswordReducer,
});

export default connect(mapStateToProps, {
  sendMail
}) (ForgotPassword);