import React from "react";
import { Button, Modal } from "react-bootstrap";

function ShowModal({show,handleClose}) {
  return (
    <>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>타이틀</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">내용</Modal.Body>
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
