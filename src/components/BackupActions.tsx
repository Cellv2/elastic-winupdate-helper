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
            <RbAccordion>
                <RbAccordion.Item eventKey="0">
                    <RbAccordion.Header
                        className={styles.removeAccordionOutline}
                    >
                        Cluster Backup Actions
                    </RbAccordion.Header>
                    <RbAccordion.Body>
                        <RbRow>
                            <RbCol>
                                <RbButton variant="outline-secondary">
                                    Backup cluster settings
                                </RbButton>
                            </RbCol>
                        </RbRow>
                        <RbRow>
                            <RbCol>
                                <RbButton variant="outline-info">
                                    View saved settings
                                </RbButton>
                            </RbCol>
                        </RbRow>
                        <RbRow>
                            <RbCol>
                                <RbButton variant="outline-danger">
                                    Restore cluster settings
                                </RbButton>
                            </RbCol>
                        </RbRow>
                    </RbAccordion.Body>
                </RbAccordion.Item>
            </RbAccordion>
        </RbContainer>
    );
};

export default BackupActions;
