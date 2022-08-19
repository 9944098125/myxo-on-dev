import React, { Fragment, useState} from "react";
import "./trainerFinance.css";
import { useSelector} from "react-redux";
import geoLocation from "../../Assets/Images/geoLocation.svg";
import { Modal } from "react-bootstrap";
import tick from "../../Assets/Images/check.svg";
import TrainerPayment from "../Payment/trainerpayment";
import Alert from "../Modal/modal";

function TrainerFinance() {
  //State Hook:
  const [show, setShow] = useState(false);
  const [payment, showPayment] = useState(false);

  //Redux State:
  const sidePanel = useSelector((state) => state.sidePanel);
  const alert = useSelector((state) => state.alert);

  // OnChangeHandlers (start):
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showPaymentModal = () => {
    handleClose();
    showPayment(true);
  };

  const toggleModal = () => {
    showPayment(!payment);
  };
  // OnChangeHandlers (end):

  return (
    <Fragment>
      {/* page wrapper*/}
      <div
        className={`page-wrapper ${
          sidePanel.toggle ? "sideClose" : "sideOpen"
        }`}
      >
        {/* container */}
        <div className="container">
          {/* alert */}
          {alert.message === "User Payment Details Updated Successfully" && (
            <Alert show={true} />
          )}
          {/* heading */}
          <div className="row">
            <div className="col borders mx-3">
              <span className="small-heading">Balance</span>
            </div>
          </div>

          {/* balance */}
          <div className="row mx-2 mt-3">
            <div className="col-sm-7">
              <div className="row brand-white p-3 rounded-3">
                <div className="col align-self-center">
                  Your balance is $260.00
                </div>
                <div className="col text-end">
                  <button className="btn primary-button">Get paid now</button>
                </div>
              </div>
            </div>
          </div>

          {/* heading */}
          <div className="row">
            <div className="col borders mx-3 mt-4">
              <span className="small-heading">Payment details</span>
            </div>
          </div>

          {/* payement detail */}
          <div className="row mx-2 mt-3">
            <div className="col-sm">
              <div className="row brand-white p-3 rounded-3">
                <div className="col align-self-center">
                  Last payment
                  <div>
                    $68.53 on Oct 23, 2021 to Direct to Local Bank (GBP) -
                    Account ending in 7777
                  </div>
                </div>
                <div className="col-sm-3 text-end align-self-center">
                  <button className="btn secondary-button">
                    View payments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* heading */}
          <div className="row">
            <div className="col borders mx-3 mt-4">
              <span className="small-heading">Schedule</span>
            </div>
          </div>

          {/* schedule */}
          <div className="row mx-2 mt-3">
            <div className="col-sm">
              <div className="row brand-white p-3 rounded-3">
                <div className="col align-self-center">
                  Weekly (next on Dec 1) to Direct to Local Bank (GBP) - Account
                  ending in 7777
                  <div>Only when balance is $100.00 or more.</div>
                </div>
                <div className="col-sm-3 text-end align-self-center">
                  <button className="btn secondary-button">
                    Edit schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* heading */}
          <div className="row">
            <div className="col borders mx-3 mt-4">
              <span className="small-heading">Payment methods</span>
            </div>
          </div>

          {/* payment methods */}
          <div className="row mx-2 mt-3">
            <div className="col-sm">
              <div className="row brand-white p-3 rounded-3">
                <div className="col align-self-center">
                  Preferred
                  <div className="align-self-center">
                    <img src={geoLocation} alt="geolocation"/>
                    Only when balance is $100.00 or more.
                  </div>
                </div>
                <div className="col text-end align-self-center">
                  <button className="btn secondary-button" onClick={handleShow}>
                    Add method
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrainerPayment shows={payment} toggle={toggleModal} />

      {/* pop up modal for add payement*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="row">
              <div className="col borders mx-4 mt-4">
                <span className="small-heading">Add a payement method</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mx-3">
            <div className="col">
              <div className="text-44 mb-3">
                Recommended direct to local bank
              </div>
              <div>
                {" "}
                <img src={tick} alt="icon"/> $0.99 USD per withdrawal
              </div>
              <div>
                {" "}
                <img src={tick} alt="icon"/> Deposit to your local bank account in GBP
              </div>
            </div>
            <div className="col-2 align-self-center text-end">
              <button className="btn primary-button" onClick={showPaymentModal}>
                Set up
              </button>
            </div>
          </div>

          <hr className="mx-3"></hr>

          <div className="row m-3">
            <div className="col">
              <div className="text-44 mb-3">Also available</div>
              <div>
                <img src={tick} alt="icon"/> $2 USD withdrawal fee
              </div>
              <div>
                <img src={tick} alt="icon"/> PayPal may charge additional fees for sending
                and withdrawing funds.
              </div>
              <div>
                <img src={tick} alt="icon"/> Set Up will take you to PayPal
              </div>
            </div>
            <div className="col-2 align-self-center text-end">
              <button className="btn secondary-button">Set up</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default TrainerFinance;
