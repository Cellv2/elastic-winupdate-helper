import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import AppSettingsModal from "./AppSettingsModal";

type Props = {
    heading: string;
};

const Header = (props: Props) => {
    return (
        <RbContainer fluid className="my-3">
            <RbRow className="d-flex align-items-center">
                <RbCol className="offset-sm-2">
                    <h1 className="display-6">{props.heading}</h1>
                </RbCol>
                <RbCol className="text-end">
                    <AppSettingsModal />
                </RbCol>
            </RbRow>
        </RbContainer>
    );
};

export default Header;
