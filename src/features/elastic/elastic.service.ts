import {
    ElasticClusterHealth,
    ElasticClusterStateMasterNodeData,
    ElasticNodeStats,
} from "../../types/elastic.types";
import { trimAndRemoveTrailingSlash } from "../../utils/string.utils";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}

// https://www.elastic.co/guide/en/elasticsearch/guide/current/_rolling_restarts.html
export const isClusterLocked = async (clusterUrl: string) => {
    try {
        const clusterSettings = await getClusterSettings(clusterUrl);
    } catch (err) {
        console.error(err);
    }
};

export const getClusterStats = async (clusterUrl: string) => {
    try {
        const nodeStats = await getNodeStats(clusterUrl);
        console.log(nodeStats);

        const clusterHealth = await getClusterHealthAsync(clusterUrl);
        console.log(clusterHealth);

        const masterNodeData = await getClusterMasterNodeDataAsync(clusterUrl);
        const masterNodeId = masterNodeData.master_node;
        const masterNodeName = masterNodeData.nodes[masterNodeId].name;
        console.log(masterNodeName);

        return { nodeStats, clusterHealth, masterNodeName };
    } catch (err) {
        // TODO: handle error notifications
        console.error(err);
    }
};

type ElasticSearchSettings = {
    persistent: ElasticSearchSettings_Cluster;
    transient: ElasticSearchSettings_Cluster;
};

type ElasticSearchSettings_Cluster = {
    cluster: {
        routing: ElasticSearchSettings_Routing;
    };
};

type ElasticSearchSettings_Routing = {
    allocation: {
        enable: boolean;
    };
};

const getClusterSettings = async (clusterUrl: string) => {};

const clusterAllocationStates = ["lock", "unlock"] as const;
type ClusterAllocationStates = typeof clusterAllocationStates[number];

const clusterAllocationBodies: Record<ClusterAllocationStates, object> = {
    lock: {
        persistent: {
            "cluster.routing.allocation.enable": "none",
        },
        transient: {
            "cluster.routing.allocation.enable": "none",
        },
    },
    unlock: {
        persistent: {
            "cluster.routing.allocation.enable": "all",
        },
        transient: {
            "cluster.routing.allocation.enable": "all",
        },
    },
};

export const setClusterAllocation = async (
    clusterUrl: string,
    stateToSet: ClusterAllocationStates
) => {
    const checkedClusterUrl = trimAndRemoveTrailingSlash(clusterUrl);

    // ES docs recomment using persistent over transient, but we set both to be sure
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/transient-settings-migration-guide.html
    const body =
        stateToSet === "lock"
            ? JSON.stringify(clusterAllocationBodies.lock)
            : JSON.stringify(clusterAllocationBodies.unlock);

    console.log(body);
    try {
        const clusterSettingsResponse = await fetch(
            checkedClusterUrl + "/_cluster/settings",
            {
                body,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (err) {
        console.error(err);
    }
};

/**
 * TODO: Write this up (what do we actually need here)
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-stats.html
 *
 * @param clusterUrl The cluster to request the node information from
 * @returns The node information
 */
const getNodeStats = async (clusterUrl: string): Promise<ElasticNodeStats> => {
    const checkedClusterUrl = trimAndRemoveTrailingSlash(clusterUrl);

    // TODO: think about the types to actually return here
    // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
    // do existing tools monitor host % cpu/ram or process
    // name,jvm.mem.heap_used_percent,process.cpu.percent,process.mem.total_virtual_in_bytes,process.os.total_in_bytes
    // human query string param is used to get some additional data and save conversions
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#_human_readable_output
    try {
        const nodeStatsResponse = await fetch(
            checkedClusterUrl + "/_nodes/stats/os,process,jvm?human"
        );

        return Promise.resolve(nodeStatsResponse.json());
    } catch (err) {
        // TODO: handle error notifications
        console.error(err);
        return Promise.reject("FIXME!");
    }
};

/**
 * Calls the given cluster and returns cluster health information
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
 *
 * @param clusterUrl The cluster to request the health information from
 * @returns The cluster health information
 */
const getClusterHealthAsync = async (
    clusterUrl: string
): Promise<ElasticClusterHealth> => {
    const checkedClusterUrl = trimAndRemoveTrailingSlash(clusterUrl);

    try {
        const clusterHealthResponse = await fetch(
            checkedClusterUrl + "/_cluster/health"
        );

        return Promise.resolve(clusterHealthResponse.json());
    } catch (err) {
        // TODO: handle error notifications
        console.error(err);
        return Promise.reject("FIXME!");
    }
};

/**
 * Calls the given cluster and returns the elected master node and associated data
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-state.html#cluster-state-api-path-params
 *
 * @param {string} clusterUrl The cluster to request the master node from
 * @returns The elected master node data
 */
const getClusterMasterNodeDataAsync = async (
    clusterUrl: string
): Promise<ElasticClusterStateMasterNodeData> => {
    const checkedClusterUrl = trimAndRemoveTrailingSlash(clusterUrl);

    try {
        const electedMasterResponse = await fetch(
            checkedClusterUrl + "/_cluster/state/master_node,nodes"
        );

        return Promise.resolve(electedMasterResponse.json());
    } catch (err) {
        // TODO: handle error notifications
        console.error(err);
        return Promise.reject("FIXME!");
    }
};
