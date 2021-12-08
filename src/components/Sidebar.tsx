import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import StatusIndicator from "./StatusIndicator";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <RbContainer fluid>
            <div className="text-center mb-2 mx-0">Configured Clusters</div>
            <Stack gap={2}>
                <RbRow>
                    <input
                        className="text-center"
                        placeholder="Filter Clusters"
                    />
                </RbRow>
                <RbRow className="border">
                    <RbCol className="d-flex p-0" xs={2}>
                        <StatusIndicator status="green" />
                    </RbCol>
                    <RbCol
                        className="d-flex p-0 justify-content-center align-items-center"
                        xs={2}
                    >
                        <FontAwesomeIcon icon={faLock} size="xs" />
                    </RbCol>
                    <RbCol className="text-center">Cluster Name</RbCol>
                </RbRow>
                <RbRow className="border">
                    <RbCol className="d-flex p-0" xs={2}>
                        <StatusIndicator status="yellow" />
                    </RbCol>
                    <RbCol
                        className="d-flex p-0 justify-content-center align-items-center"
                        xs={2}
                    >
                        <FontAwesomeIcon icon={faLockOpen} size="xs" />
                    </RbCol>
                    <RbCol className="text-center">Cluster Name</RbCol>
                </RbRow>
                <RbRow className="border">
                    <RbCol className="d-flex p-0" xs={2}>
                        <StatusIndicator status="red" />
                    </RbCol>
                    <RbCol
                        className="d-flex p-0 justify-content-center align-items-center"
                        xs={2}
                    >
                        <FontAwesomeIcon icon={faLockOpen} size="xs" />
                    </RbCol>
                    <RbCol className="text-center">Cluster Name</RbCol>
                </RbRow>
            </Stack>
        </RbContainer>
    );
};

export default Sidebar;
