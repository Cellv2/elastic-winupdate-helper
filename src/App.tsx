import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import { useAppSelector } from "./app/hooks";
import BackupActions from "./components/BackupActions";
import ClusterActions from "./components/ClusterActions";
import ClusterInfo from "./components/ClusterInfo";
import Header from "./components/Header";
import NodeInfo from "./components/NodeInfo";
import Sidebar from "./components/Sidebar";
import ElasticConnectButton from "./features/elastic/ElasticConnectButton";
import { selectClusterName } from "./features/elastic/elasticSlice";

const App = () => {
    const currentClusterName = useAppSelector(selectClusterName);
    return (
        <>
            <div>
                <RbContainer fluid>
                    <RbRow>
                        <RbCol>
                            <Header heading={currentClusterName} />
                        </RbCol>
                    </RbRow>
                    <RbRow>
                        <RbCol xs={2}>
                            <Sidebar />
                        </RbCol>
                        <RbCol>
                            <ElasticConnectButton />
                            <NodeInfo />
                            <ClusterInfo />
                            <ClusterActions />
                            <BackupActions />
                        </RbCol>
                    </RbRow>
                </RbContainer>
            </div>
        </>
    );
};

export default App;
