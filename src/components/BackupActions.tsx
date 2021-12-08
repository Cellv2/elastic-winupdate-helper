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
        <RbContainer fluid className="p-0 mt-5">
            <RbAccordion flush>
                <RbAccordion.Item eventKey="0">
                    <RbAccordion.Header
                        className={styles.backupActionsHeader}
                    >
                        Cluster Backup Actions
                    </RbAccordion.Header>
                    <RbAccordion.Body className="px-0">
                        <RbRow className="my-2">
                            <RbCol xs={4}>
                                <div className="d-grid">
                                    <RbButton variant="outline-secondary">
                                        Backup cluster settings
                                    </RbButton>
                                </div>
                            </RbCol>
                            <RbCol>Takes a backup of the cluster settings. Prompts to overwrite if a backup already exists</RbCol>
                        </RbRow>
                        <RbRow className="my-2">
                            <RbCol xs={4}>
                                <div className="d-grid">
                                    <RbButton variant="outline-info">
                                        View saved settings
                                    </RbButton>
                                </div>
                            </RbCol>
                            <RbCol>Button disabled if no backup detected. Opens a modal with the cluster settings. Has a copy to clipboard button</RbCol>
                        </RbRow>
                        <RbRow className="my-2">
                            <RbCol xs={4}>
                                <div className="d-grid">
                                    <RbButton variant="outline-danger">
                                        Restore cluster settings
                                    </RbButton>
                                </div>
                            </RbCol>
                            <RbCol>Button disabled if no backup detected. Prompts to ensure you want to restore.</RbCol>
                        </RbRow>
                    </RbAccordion.Body>
                </RbAccordion.Item>
            </RbAccordion>
        </RbContainer>
    );
};

export default BackupActions;
