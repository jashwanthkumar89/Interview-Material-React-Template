import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalInfo.scss'

const ModalInfo = ({ modalTitle, lgShow, setLgShow, ...props}:any) => {


    return (
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg modal-title">
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default ModalInfo;