import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";

type Props = {
    heading: string;
};

const Header = (props: Props) => {
    return (
        <RbContainer fluid className="my-3">
            <RbRow>
                <RbCol>{props.heading}</RbCol>
                <RbCol xs={1} sm>
                    {" "}
                </RbCol>
                <RbCol>Settings</RbCol>
            </RbRow>
        </RbContainer>
    );
};

export default Header;