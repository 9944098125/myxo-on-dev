import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./modal.css";
import check from "../../Assets/Images/tick.svg";
import cross from "../../Assets/Images/cross.svg";

export default function Alert(props) {
  //Accessing props   
  const { show } = props;
  //Redux state
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {alert.type === "success" ? (
        <Modal size="sm" show={show} centered>
          <Modal.Title className="alert-modal-success">
            <div className="alert-modal">
              <img src={check} alt="success" />
            </div>
            <div className="alert-modal">Success!</div>
          </Modal.Title>
          <Modal.Body className="alert-message">{alert.message}</Modal.Body>
        </Modal>
      ) : (
        <Modal size="sm" show={show} centered>
          <Modal.Title className="alert-modal-error">
            <div className="alert-modal">
              <img src={cross} alt="error" />
            </div>
            <div className="alert-modal">Error!</div>
          </Modal.Title>
          <Modal.Body className="alert-message">{alert.message}</Modal.Body>
        </Modal>
      )}
    </>
  );
}
