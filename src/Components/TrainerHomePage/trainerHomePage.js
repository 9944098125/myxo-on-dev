import React, { Fragment, useEffect, useState } from "react";
import "./trainerHomePage.css";
import fb from "../../Assets/Images/social-facebook-dark.svg";
import insta from "../../Assets/Images/Union-dark.svg";
import twitter from "../../Assets/Images/Vector-dark.svg";
import {
  cover_image,
  profile_description,
} from "../../Redux/Actions/trainerProfileActions";
import { connect } from "react-redux";
import video from "../../Assets/Images/video.svg";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/loginAction";
import ImageLayout from "../Common/ImageLayout";
import format from "date-fns/format";
import ClassModal from "../ClassModal/ClassModal";
import { Modal } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import time from "../../Assets/Images/time.svg";
import { roles } from "../Shared/constants";
import {
  getClasses,
  deleteClass,
  getClassByMonth,
} from "../../Redux/Actions/scheduleClassAction";
import { convertToYYYYMMDD, convertToDDDAY } from "../Shared/dateFormats";
import { useNavigate } from "react-router";

function TrainerProfile() {
  const userId = localStorage.getItem("user_id");

  //State Hook:
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [id, setId] = useState("");

  const formattedDate = convertToYYYYMMDD(date);
  const shortDate = convertToDDDAY(date);
  const [selectedClassId, setSelectedClassId] = useState(null);

  //Redux Dispatch:
  const dispatch = useDispatch();

  //Redux State:
  const data = useSelector((state) => state.trainerProfile);
  const sidePanel = useSelector((state) => state.sidePanel);
  const LoginDetails = useSelector((state) => state.auth);
  const scheduledClass = useSelector((state) => state.scheduleClass);
  const alert = useSelector((state) => state.alert);

  var classDates = [];

  if (scheduledClass.monthlyResponse) {
    classDates = scheduledClass.monthlyResponse.map((i) => i.class_date);
    Array.from(new Set(classDates));
  }
  // Array.from lets you create an array with the array like objects with length and index properties
  
  const tileClassName = ({date, view}) => {
    if (view === 'month') {
      if (classDates.includes(convertToYYYYMMDD(date, "yyyy-MM-dd"))) {
        return "highlight";
      } else {
        return null;
      }
    }
  }

  //React Router Navigate:
  const navigation = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setShow(true);
    setSelectedClassId(item.id);
    setId(item.id);
  };

  const viewConfirmationModal = () => {
    handleClose();
    setShowConfirmationModal(true);
  };

  const navigateToStream = () => {
    navigation("/stream/" + id);
  };

  const cancelClass = () => {
    dispatch(deleteClass(selectedClassId));
    toggleModal();
  };

  const content1 = {
    heading: "Are You sure, You want to cancel the class ?",
    description: "This will affect your weekly earnings !!",
    confirm: "Yes",
    reject: "No",
  };

  const toggleModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const onDateChangeHandler = (selectedDate) => {
    setDate(selectedDate);
  };

  //UseEffects (start):
  //logout invalid users
  useEffect(() => {
    if (Number(LoginDetails.role_id) === roles.USER_ROLE_ID) {
      dispatch(logout());
    }
  }, [LoginDetails, dispatch]);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(profile_description(id));
  }, [dispatch]);

  useEffect(() => {
    if (data.userInfo && data.userBio) {
      if (data.userInfo[0]) {
        setUserName(
          data.userInfo[0].first_name + " " + data.userInfo[0].last_name
        );
      }
    }
    if (data.userBio) {
      if (data.userBio[0]) {
        setUserMail(data.userBio[0].user_name);
        setUserDescription(data.userBio[0].bio);
      }
    }
    if (data.social) {
      if (data.social[1] !== "" || data.social[1] != null) {
        setFbLink(data.social[1]);
      }
      if (data.social[0] !== "" || data.social[0] != null) {
        setInstaLink(data.social[0]);
      }
      if (data.social[2] !== "" || data.social[2] != null) {
        setTwitterLink(data.social[2]);
      }
    }
  }, [data.userInfo, data.userBio, data.social]);

  useEffect(() => {
    dispatch(getClasses(userId, formattedDate));
  }, [date, formattedDate, dispatch, userId]);

  useEffect(() => {
    dispatch(getClassByMonth(formattedDate, userId));
  }, [date, formattedDate, userId, dispatch]);

  useEffect(() => {
    if (alert.type === "success") {
      dispatch(getClasses(userId, formattedDate));
    }
  }, [alert, formattedDate, dispatch, userId]);
  // UseEffects (end):
  // console.log(scheduledClass.error);

  return (
    <Fragment>
      <div
        className={`page-wrapper ${
          sidePanel.toggle ? "sideClose" : "sideOpen"
        }`}
      >
        <div className="container">
          <ImageLayout />

          <div className="row">
            <div className="col-md-8">
              <div className="profile-name mt-1">{userName}</div>
              <div className="profile-mail mt-1 fst-italic">{userMail}</div>
              <div className="profile-description mt-1 mb-4">
                {userDescription}
              </div>

              <div className="followers mb-4">
                1,240 followers
                {fbLink && (
                  <a href={fbLink} target="_blank" rel="noreferrer">
                    <img src={fb} alt="fb" className="mx-3 ms-5 fb" />
                  </a>
                )}
                {instaLink && (
                  <a href={instaLink} target="_blank" rel="noreferrer">
                    <img src={insta} alt="insta" className="mx-3" />
                  </a>
                )}
                {twitterLink && (
                  <a href={twitterLink} target="_blank" rel="noreferrer">
                    <img src={twitter} alt="twitter" className="mx-2" />
                  </a>
                )}
              </div>

              <div className="d-flex align-items-center">
                <div className="borders">
                  <span className="small-heading mx-2">MY SCHEDULE</span>
                </div>
                <ClassModal date={formattedDate} />
              </div>
              <div className="row calender-container my-4">
                <div className="col-lg-8 gx-0">
                  <Calender
                    onChange={onDateChangeHandler}
                    value={date}
                    tileClassName={tileClassName}
                    onActiveStartDateChange={({ activeStartDate }) =>
                      dispatch(
                        getClassByMonth(
                          format(activeStartDate, "yyyy-MM-dd"),
                          userId
                        )
                      )
                    }
                  />
                </div>
                <div className="col-md gx-md-0">
                  <div className="borders my-2">
                    <span className="ms-2">Schedule for {shortDate}</span>
                  </div>
                  <div className="box border-top">
                    {/* for loop */}
                    {/* Array.isArray(arrayWeWant) determines whether the paramaeter in it is an array or not */}
                    {Array.isArray(scheduledClass.response) ? (
                      scheduledClass.response.map((item, index) => (
                        <div key={index}>
                          <div className="d-flex mt-2">
                            <img className="me-2" src={time} alt="time" />
                            <span className="time" key={index}>
                              {item.start_time} - {item.end_time}
                            </span>
                          </div>
                          <div
                            className="bg-2 mb-2"
                            onClick={() => handleShow(item)}
                          >
                            <div className="class-name">{item.class_name}</div>
                            <div className="number">20 people signed in</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mt-4 text-center">
                        <p>{scheduledClass.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md mar mt-2">
              <div className="row ms-4">
                <div className="d-flex mb-4">
                  <button className="secondary-button btn-1">
                    <img src={video} alt="icon" className="video" />
                    Start streaming
                  </button>
                </div>

                <div className="d-flex justify-content-evenly mt-3">
                  <span className="text-11 mt-3 mb-4">
                    NEXT CLASS WILL START IN{" "}
                    <span className="text-12">0:15:43 min</span>
                  </span>
                </div>

                {/* <div className="d-flex"> */}
                <div className="d-flex justify-content-between">
                  <div className="small-heading mt-3 mb-3 borders">
                    <span className="ms-2">MY EARNINGS</span>
                  </div>
                  <div className=" dropdown mt-3 mb-2">
                    <select name="week">
                      <option value="volvo">1 week</option>
                      <option value="saab">2 week</option>
                      <option value="mercedes">3 week</option>
                      <option value="audi">4 week</option>
                    </select>
                  </div>
                </div>

                <div className="row bg-1 m-2">
                  <div className="col" style={{ fontSize: "12px" }}>
                    5 Aug - 11 Aug
                  </div>
                  <div className="col" style={{ fontSize: "12px" }}>
                    Good job 👍
                  </div>
                  <div className="mt-1 mb-2" style={{ fontSize: "12px" }}>
                    $ 586 total this week
                  </div>
                  <div className="progress mb-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      8 August - $122
                    </div>
                  </div>
                  <div className="progress mt-2 mb-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      9 august - $80
                    </div>
                  </div>
                  <div className="progress mt-2 mb-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "55%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      10 august - $58
                    </div>
                  </div>
                  <div className="progress mt-2 mb-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "85%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      11 august - $83
                    </div>
                  </div>
                  <div className="progress mt-2 mb-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "65%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      12 august
                    </div>
                  </div>
                  <div className="progress mt-2">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow="90"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      0FF
                    </div>
                  </div>

                  <div className="text-center">reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        toggle={toggleModal}
        show={showConfirmationModal}
        content={content1}
        cancelClass={cancelClass}
      />
      {/* just remember to specify the properties of content everywhere while using this component,
      heading, description, confirm, reject */}

      <div className="d-flex flex-row justify-content-center align-items-center">
        {/* schedule class popup*/}
        <Modal size="md" show={show} centered onHide={handleClose}>
          <Modal.Header closeButton>
            <h4 className="question mt-3">
              Do you want to start the class <br /> OR <br /> cancel the class ?
            </h4>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              {/* <div className="question mt-3 mb-3">
                Do you want to start the class <br /> OR <br /> cancel the class
                ?
              </div> */}
              <div className="modal-buttons">
                <button
                  className="btn secondary-button btn-w"
                  onClick={navigateToStream}
                >
                  Start
                </button>
                <button
                  className="btn primary-button btn-w"
                  onClick={viewConfirmationModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  trainerProfile: state.trainerProfile,
  sidePanel: state.sidePanel,
});

export default connect(mapStateToProps, { cover_image, profile_description })(
  TrainerProfile
);
