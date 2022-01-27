import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
    ElasticClusterHealth,
    ElasticNodeStats,
} from "../../types/elastic.types";
import { getClusterStats, setClusterAllocation } from "./elastic.service";

export type ElasticState = {
    value: number;
    status: "idle" | "loading" | "failed";
    clusterHealth: ElasticClusterHealth;
    masterNodeName: string;
    nodeStats: ElasticNodeStats; // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
};

const emptyClusterHealth: ElasticClusterHealth = {
    active_primary_shards: 0,
    active_shards: 0,
    active_shards_percent_as_number: 0,
    cluster_name: "Not Connected",
    delayed_unassigned_shards: 0,
    initializing_shards: 0,
    number_of_data_nodes: 0,
    number_of_in_flight_fetch: 0,
    number_of_nodes: 0,
    number_of_pending_tasks: 0,
    relocating_shards: 0,
    status: "Not Connected",
    task_max_waiting_in_queue_millis: 0,
    timed_out: true,
    unassigned_shards: 0,
};

const emptyNodeStats: ElasticNodeStats = {
    cluster_name: "Not Connected",
    nodes: {
        "Unknown Node": {
            host: "Unknown",
            ip: "Unknown",
            transport_address: "Unknown",
            name: "Unknown Node",
            jvm: {
                timestamp: 0,
                uptime: "0s",
                uptime_in_millis: 0,
                mem: {
                    heap_used_in_bytes: 0,
                    heap_used_percent: 0,
                    heap_committed_in_bytes: 0,
                    heap_max_in_bytes: 0,
                    non_heap_used_in_bytes: 0,
                    non_heap_committed_in_bytes: 0,
                    pools: {
                        young: {
                            used_in_bytes: 0,
                            max_in_bytes: 0,
                            peak_used_in_bytes: 0,
                            peak_max_in_bytes: 0,
                        },
                        old: {
                            used_in_bytes: 0,
                            max_in_bytes: 0,
                            peak_used_in_bytes: 0,
                            peak_max_in_bytes: 0,
                        },
                        survivor: {
                            used_in_bytes: 0,
                            max_in_bytes: 0,
                            peak_used_in_bytes: 0,
                            peak_max_in_bytes: 0,
                        },
                    },
                },
                threads: {
                    count: 0,
                    peak_count: 0,
                },
                gc: {
                    collectors: {
                        young: {
                            collection_count: 0,
                            collection_time_in_millis: 0,
                        },
                        old: {
                            collection_count: 0,
                            collection_time_in_millis: 0,
                        },
                    },
                },
                buffer_pools: {
                    mapped: {
                        count: 0,
                        used_in_bytes: 0,
                        total_capacity_in_bytes: 0,
                    },
                    direct: {
                        count: 0,
                        used_in_bytes: 0,
                        total_capacity_in_bytes: 0,
                    },
                    "mapped - 'non-volatile memory'": {
                        count: 0,
                        used_in_bytes: 0,
                        total_capacity_in_bytes: 0,
                    },
                },
                classes: {
                    current_loaded_count: 0,
                    total_loaded_count: 0,
                    total_unloaded_count: 0,
                },
            },
            os: {
                timestamp: 0,
                cpu: {
                    percent: 0,
                    load_average: {
                        "1m": 0.0,
                        "5m": 0.0,
                        "15m": 0.0,
                    },
                },
                mem: {
                    total_in_bytes: 0,
                    free_in_bytes: 0,
                    used_in_bytes: 0,
                    free_percent: 0,
                    used_percent: 0,
                },
            },
            process: {
                timestamp: 0,
                open_file_descriptors: 0,
                max_file_descriptors: 0,
                cpu: {
                    percent: 0,
                    total_in_millis: 0,
                },
                mem: {
                    total_virtual_in_bytes: 0,
                },
            },
        },
    },
};

const initialState: ElasticState = {
    value: 0,
    status: "idle",
    clusterHealth: emptyClusterHealth,
    masterNodeName: "Unknown",
    nodeStats: emptyNodeStats,
};

export const getClusterInfoAsync = createAsyncThunk(
    "elastic/getClusterStats",
    async (clusterUrl: string) => {
        const response = await getClusterStats(clusterUrl);
        return response;
    }
);

export const lockClusterAsync = createAsyncThunk(
    "elastic/lockCluster",
    async (clusterUrl: string) => {
        await setClusterAllocation(clusterUrl, "lock");
    }
);

export const unlockClusterAsync = createAsyncThunk(
    "elastic/unlockCluster",
    async (clusterUrl: string) => {
        await setClusterAllocation(clusterUrl, "unlock");
    }
);

export const elasticSlice = createSlice({
    name: "elastic",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClusterInfoAsync.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getClusterInfoAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.clusterHealth =
                action.payload?.clusterHealth ?? emptyClusterHealth;
            state.masterNodeName = action.payload?.masterNodeName ?? "Unknown";
            state.nodeStats = action.payload?.nodeStats ?? emptyNodeStats;
        });
        builder.addCase(getClusterInfoAsync.rejected, (state) => {
            state.status = "failed";
            state.clusterHealth = emptyClusterHealth;
            state.masterNodeName = "Unknown";
            state.nodeStats = emptyNodeStats;
        });

        builder.addCase(lockClusterAsync.pending, (state) => {
            // TODO: add message - cluster is locking
        });
        builder.addCase(lockClusterAsync.fulfilled, (state) => {
            // TODO: add message - cluster successfully locked
        });
        builder.addCase(lockClusterAsync.rejected, (state) => {
            // TODO: add message - cluster failed to lock, please try again
        });
        builder.addCase(unlockClusterAsync.pending, (state) => {
            // TODO: add message - cluster is unlocking
        });
        builder.addCase(unlockClusterAsync.fulfilled, (state) => {
            // TODO: add message - cluster successfully unlocked
        });
        builder.addCase(unlockClusterAsync.rejected, (state) => {
            // TODO: add message - cluster failed to unlock, please try again
        });
    },
});

export const {} = elasticSlice.actions;

export const selectClusterNodeStats = (state: RootState) =>
    state.elastic.nodeStats;

export const selectClusterHealth = (state: RootState) =>
    state.elastic.clusterHealth;

export const selectClusterName = (state: RootState) =>
    state.elastic.clusterHealth.cluster_name;

export const selectMasterNodeName = (state: RootState) =>
    state.elastic.masterNodeName;

export default elasticSlice.reducer;
