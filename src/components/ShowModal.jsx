import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../assets/css/modal.css"

function ShowModal({show,handleClose, title, className="", children}) {
  return (
    <>


      <Modal show={show} onHide={handleClose} centered dialogClassName={className}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          {children}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowModal;
