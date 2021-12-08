import React from "react";

type Props = {
    status: ClusterStates;
};

const clusterStates = ["green", "yellow", "red"] as const;
type ClusterStates = typeof clusterStates[number];

const StatusIndicator = (props: Props) => {
    return <div className="w-100" style={{ backgroundColor: props.status }}></div>;
};

export default StatusIndicator;
