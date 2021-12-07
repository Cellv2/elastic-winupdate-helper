import React from "react";
import RbContainer from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <RbContainer fluid>
            <div className="mb-2">Saved Clusters</div>
            <Stack gap={2}>
                <input placeholder="Filter me" />
                <div className="bg-light border">First item</div>
                <div className="bg-light border">Second item</div>
                <div className="bg-light border">Third item</div>
            </Stack>
        </RbContainer>
    );
};

export default Sidebar;
