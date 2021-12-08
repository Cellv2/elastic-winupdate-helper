import React, { useState } from "react";
import RbButton from "react-bootstrap/Button";
import RbModal from "react-bootstrap/Modal";
import styles from "./AppSettingsModal.module.css";

type Props = {};

const AppSettingsModal = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <RbButton
                variant="light"
                onClick={handleShow}
                className={styles.modalButton}
            >
                Settings
            </RbButton>

            <RbModal show={show} onHide={handleClose} centered>
                <RbModal.Header closeButton>
                    <RbModal.Title>Settings</RbModal.Title>
                </RbModal.Header>
                <RbModal.Body>List of application settings goes here</RbModal.Body>
                <RbModal.Footer>
                    <RbButton variant="outline-secondary" onClick={handleClose}>
                        Close
                    </RbButton>
                    <RbButton variant="outline-primary" onClick={handleClose}>
                        Save Changes
                    </RbButton>
                </RbModal.Footer>
            </RbModal>
        </>
    );
};

export default AppSettingsModal;
