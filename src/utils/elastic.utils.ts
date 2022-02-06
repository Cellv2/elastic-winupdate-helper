import { ElasticState } from "../features/elastic/elasticSlice";

export const determineIfClusterIsLocked = (
    allocationState: ElasticState["clusterShardAllocationStates"]
): boolean => {
    console.log(allocationState);
    if (allocationState === null) {
        return false;
    }

    if (
        allocationState.persistent === "none" &&
        allocationState.transient === "none"
    ) {
        return true;
    }

    return false;
};
