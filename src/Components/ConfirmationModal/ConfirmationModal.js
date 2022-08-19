import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import "./ConfirmationModal.css";

function CancelConfirmationModal(props) {
  const { show, toggle, content, cancelClass } = props;

  return (
    <Fragment>
      <Modal show={show} size="md" centered onHide={toggle}>
        <div className="d-flex flex-column p-3">
          <div className="question-confirm-modal mt-4 mb-3">{content.heading}</div>
          <div className="smaller mb-4">{content.description}</div>
          <div className="modal-buttons mb-3">
            <button className="btn secondary-button btn-w" onClick={cancelClass}>{content.confirm}</button>
            <button className="btn primary-button btn-w" onClick={toggle}>{content.reject}</button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
export default CancelConfirmationModal;
