import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PillRegisterModal.style.css"
import { Form, FormLabel } from "react-bootstrap";

const PillRegisterModal = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>약 등록하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 1. 약 이름
        2. 복용 시작일
        3. 복용 종료일
        4. 복용량
        5. 알림 여부
        6. 메모 */}
        <Form className="pill-register-form">
            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">약 이름</FormLabel>
                <Form.Control
                    placeholder="약 이름 입력"
                    required
                    // onChange={}
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">복용 시작일</FormLabel>
                <Form.Control
                    placeholder="복용 시작일 입력"
                    required
                    // onChange={}
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">복용 종료일</FormLabel>
                <Form.Control
                    placeholder="복용 종료일 입력"
                    required
                    // onChange={}
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">복용량</FormLabel>
                <Form.Control
                    placeholder="복용량 입력"
                    required
                    // onChange={}
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">알림 여부</FormLabel>
                <Form.Control
                    placeholder="알림 여부 입력"
                    required
                    // onChange={}
                />
            </Form.Group>
            
            <Form.Group className="mb-2">
                <FormLabel className="pill-input-title">메모</FormLabel>
                <Form.Control
                    placeholder="메모..."
                    required
                    // onChange={}
                />
            </Form.Group>

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          등록하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PillRegisterModal;
