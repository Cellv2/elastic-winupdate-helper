import React from "react";
import RbButton from "react-bootstrap/Button";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import { useAppDispatch } from "../app/hooks";
import {
    lockClusterAsync,
    unlockClusterAsync,
} from "../features/elastic/elasticSlice";

type Props = {};

const ClusterActions = (props: Props) => {
    const dispatch = useAppDispatch();
    return (
        <RbContainer fluid className="mt-5 px-0">
            <RbRow className="my-2 align-items-center">
                <RbCol xs={4}>
                    <div className="d-grid">
                        <RbButton
                            variant="outline-secondary"
                            onClick={() =>
                                dispatch(
                                    lockClusterAsync("http://localhost:9200")
                                )
                            }
                        >
                            Lock cluster
                        </RbButton>
                    </div>
                </RbCol>
                <RbCol>Cluster successfully locked</RbCol>
            </RbRow>
            <RbRow className="my-2 align-items-center">
                <RbCol xs={4}>
                    <div className="d-grid">
                        <RbButton variant="outline-secondary">
                            Flush cluster
                        </RbButton>
                    </div>
                </RbCol>
                <RbCol>
                    Cluster flushed. Total: 100. Successful: 100. Failures: 0
                </RbCol>
            </RbRow>
            <RbRow className="my-2 align-items-center">
                <RbCol xs={4}>
                    <div className="d-grid">
                        <RbButton variant="outline-secondary">
                            Update shard reallocation count - Lock
                        </RbButton>
                    </div>
                </RbCol>
                <RbCol>
                    Shard allocation updated. Shard allocation set to ...
                </RbCol>
            </RbRow>
            <RbRow className="my-2 align-items-center">
                <RbCol xs={4}>
                    <div className="d-grid">
                        <RbButton
                            variant="outline-secondary"
                            onClick={() =>
                                dispatch(
                                    unlockClusterAsync("http://localhost:9200")
                                )
                            }
                        >
                            Unlock cluster
                        </RbButton>
                    </div>
                </RbCol>
                <RbCol>Cluster successfully unlocked</RbCol>
            </RbRow>
            <RbRow className="my-2 align-items-center">
                <RbCol xs={4}>
                    <div className="d-grid">
                        <RbButton variant="outline-secondary">
                            Update shard reallocation count - Unlock
                        </RbButton>
                    </div>
                </RbCol>
                <RbCol>
                    Shard allocation updated. Shard allocation set to ...
                </RbCol>
            </RbRow>
        </RbContainer>
    );
};

export default ClusterActions;
