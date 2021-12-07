import React from "react";
import RbAccordion from "react-bootstrap/Accordion";
import RbButton from "react-bootstrap/Button";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import styles from "./BackupActions.module.css";

type Props = {};

const BackupActions = (props: Props) => {
    return (
        <RbContainer fluid>
            <RbAccordion flush>
                <RbAccordion.Item eventKey="0">
                    <RbAccordion.Header
                        className={styles.removeAccordionOutline}
                    >
                        Cluster Backup Actions
                    </RbAccordion.Header>
                    <RbAccordion.Body>
                        <RbRow className="my-2">
                            <RbCol>
                                <div className="d-grid">
                                    <RbButton variant="outline-secondary">
                                        Backup cluster settings
                                    </RbButton>
                                </div>
                            </RbCol>
                        </RbRow>
                        <RbRow className="my-2">
                            <RbCol>
                                <div className="d-grid">
                                    <RbButton variant="outline-info">
                                        View saved settings
                                    </RbButton>
                                </div>
                            </RbCol>
                        </RbRow>
                        <RbRow className="my-2">
                            <RbCol>
                                <div className="d-grid">
                                    <RbButton variant="outline-danger">
                                        Restore cluster settings
                                    </RbButton>
                                </div>
                            </RbCol>
                        </RbRow>
                    </RbAccordion.Body>
                </RbAccordion.Item>
            </RbAccordion>
        </RbContainer>
    );
};

export default BackupActions;
