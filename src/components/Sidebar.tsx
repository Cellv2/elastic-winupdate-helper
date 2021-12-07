import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import styles from "./Sidebar.module.css";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <RbContainer fluid>
            <div className={`${styles.centerText} mb-2 mx-0`}>
                Configured Clusters
            </div>
            <Stack gap={2}>
                <RbRow>
                    <input
                        className={styles.centerText}
                        placeholder="Filter Clusters"
                    />
                </RbRow>
                <RbRow className="border">
                    <RbCol xs={1}>G</RbCol>
                    <RbCol xs={1}>L</RbCol>
                    <RbCol className={styles.centerText}>Cluster Name</RbCol>
                </RbRow>
                <RbRow className="border">
                    <RbCol xs={1}>G</RbCol>
                    <RbCol xs={1}>L</RbCol>
                    <RbCol className={styles.centerText}>Cluster Name</RbCol>
                </RbRow>
                <RbRow className="border">
                    <RbCol xs={1}>G</RbCol>
                    <RbCol xs={1}>L</RbCol>
                    <RbCol className={styles.centerText}>Cluster Name</RbCol>
                </RbRow>
            </Stack>
        </RbContainer>
    );
};

export default Sidebar;
