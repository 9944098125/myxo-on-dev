import React, { Fragment, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { scheduleClass } from "../../Redux/Actions/scheduleClassAction";
import Alert from "../Modal/modal";
import { errorConstants, typeOptions } from "../Shared/constants";
import { useNavigate } from "react-router";
import { BiTimeFive } from "react-icons/bi";

import "./ClassModal.css";

function ClassModal(props) {
  const { date } = props;

  const [showModal, setShowModal] = useState(false);
  // const [startTime, setStartTime] = useState(null);
  // const [finishTime, setFinishTime] = useState(null);
  // const [validateTime, setValidateTime] = useState(false);

  // function onChangeStartTime(e) {
  //   setStartTime(e.target.value);
  // };

  // function onChangeEndTime(e) {
  //   setFinishTime(e.target.value);
  // }

  const navigation = useNavigate();

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Redux Selector:
  const alert = useSelector((state) => state.alert);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const initialValues = {
    classTheme: "",
    typeOfClass: "",
    description: "",
    startTime: "",
    finishTime: "",
  };

  useEffect(() => {
    if (alert.type === "success_clear") {
      navigation("/trainer-profile");
    }
  }, [showModal, alert, navigation]);

  // Validations (start):
  const validate = (values) => {
    const errors = {};
    if (!values.classTheme) {
      errors.classTheme = errorConstants.CLASS_NAME;
    }
    if (!values.startTime) {
      errors.startTime = errorConstants.START_TIME;
    }
    if (!values.finishTime) {
      errors.finishTime = errorConstants.END_TIME;
    }
    if (!values.typeOfClass) {
      errors.typeOfClass = errorConstants.TYPE_OF_CLASS;
    }
    if (!values.description) {
      errors.description = errorConstants.DESCRIPTION;
    }
    return errors;
  };
  // Validations (end):

  function timeFormat(time) {
    var timeSplit = time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return hours + ":" + minutes + " " + meridian;
  }

  function handleSubmit(values) {
    const id = localStorage.getItem("user_id");
    const classData = {
      class_name: values.classTheme,
      start_time: timeFormat(values.startTime),
      end_time: timeFormat(values.finishTime),
      type_of_class: values.typeOfClass,
      description: values.description,
      class_date: date,
    };
    dispatch(scheduleClass(id, classData));
    closeModal();
  }

  return (
    <Fragment>
      <button onClick={openModal} className="btn ms-3 secondary-button">
        Schedule a New Class
      </button>
      {alert.message && <Alert show={true} />}
      {showModal && (
        <Modal
          show={showModal}
          size="md"
          centered
          onHide={closeModal}
          backdrop="static"
        >
          <div className="d-flex flex-column p-5 pb-4 pt-0">
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="borders class-head mt-2 mb-2">
                  <span className="small-heading mx-2">
                    SCHEDULE A NEW CLASS
                  </span>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={initialValues}
              validate={(values) => validate(values)}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="d-flex flex-column mb-3">
                    <Field
                      name="classTheme"
                      type="text"
                      placeholder="Class Theme"
                      className={
                        errors.classTheme && touched.classTheme
                          ? "form-control primary-input-field is-invalid"
                          : "form-control primary-input-field"
                      }
                    />
                    {errors.classTheme && touched.classTheme ? (
                      <div className="invalid-feedback">
                        {errors.classTheme}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* start time and finish time */}
                  <div className="sf-row">
                    <div className="s-time">
                      <div className="input-group align-items-center">
                        <Field
                          id="session-time"
                          type="time"
                          name="startTime"
                          placeholder="Start Time"
                          className={
                            errors.startTime && touched.startTime
                              ? "form-control primary-input-field is-invalid pass"
                              : "form-control primary-input-field pass"
                          }
                        />
                        <span className="input-group-text border-left-0"
                         id="time"
                        >
                          <BiTimeFive className="time-icon" />
                        </span>
                        {touched.startTime && errors.startTime ? (
                          <div className="invalid-feedback">
                            {errors.startTime}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="f-time">
                      <div className="input-group align-items-center">
                        <Field
                          id="session-time"
                          name="finishTime"
                          type="time"
                          placeholder="Finish Time"
                          className={
                            errors.finishTime && touched.finishTime
                              ? "form-control primary-input-field is-invalid pass"
                              : "form-control primary-input-field pass"
                          }
                        />
                        <span className="input-group-text border-left-0"
                         id="time"
                        >
                          <BiTimeFive className="time-icon" />
                        </span>
                        {touched.finishTime && errors.finishTime ? (
                          <div className="invalid-feedback">
                            {errors.finishTime}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <Field
                      as="select"
                      name="typeOfClass"
                      className={
                        errors.typeOfClass && touched.typeOfClass
                          ? "form-control primary-input-field is-invalid"
                          : "form-control primary-input-field"
                      }
                    >
                      <option defaultValue="" value="">
                        Type of Class
                      </option>
                      {typeOptions.map((each) => (
                        <option key={each.value} value={each.value}>
                          {each.text}
                        </option>
                      ))}
                    </Field>
                    {errors.typeOfClass && touched.typeOfClass ? (
                      <div className="invalid-feedback">
                        {errors.typeOfClass}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <Field
                      as="textarea"
                      name="description"
                      type="text"
                      placeholder="Description"
                      rows="5"
                      className={
                        errors.description && touched.description
                          ? "form-control primary-input-field is-invalid"
                          : "form-control primary-input-field"
                      }
                    />
                    {errors.description && touched.description ? (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex">
                    <button type="submit" className="btn primary-button btn4">
                      Submit
                    </button>
                  </div>
                  {errors.date}
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  scheduleClass: state.scheduleClass,
});

export default connect(mapStateToProps, { scheduleClass })(ClassModal);
