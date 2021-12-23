import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
    ElasticClusterHealth,
    ElasticNodeInfo,
} from "../../types/elastic.types";
import { getClusterStats } from "./elastic.service";

export type ElasticState = {
    value: number;
    status: "idle" | "loading" | "failed";
    clusterHealth: ElasticClusterHealth;
    masterNodeName: string;
    nodeStats: ElasticNodeInfo[]; // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
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

const initialState: ElasticState = {
    value: 0,
    status: "idle",
    clusterHealth: emptyClusterHealth,
    masterNodeName: "Unknown",
    nodeStats: [],
};

export const getNodeInfoAsync = createAsyncThunk(
    "elastic/getClusterStats",
    async (clusterUrl: string) => {
        const response = await getClusterStats(clusterUrl);
        return response;
    }
);

export const elasticSlice = createSlice({
    name: "elastic",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNodeInfoAsync.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getNodeInfoAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.clusterHealth =
                action.payload?.clusterHealth ?? emptyClusterHealth;
            state.masterNodeName = action.payload?.masterNodeName ?? "Unknown";
            state.nodeStats = action.payload?.nodeStats;
        });
        builder.addCase(getNodeInfoAsync.rejected, (state) => {
            state.status = "failed";
            state.clusterHealth = emptyClusterHealth;
            state.masterNodeName = "Unknown";
            state.nodeStats = [];
        });
    },
});

export const {} = elasticSlice.actions;

export const selectClusterNodeStats = (state: RootState) =>
    state.elastic.nodeStats;

export const selectClusterHealth = (state: RootState) =>
    state.elastic.clusterHealth;

export const selectClusterName = (state: RootState) =>
    state.elastic.clusterHealth?.cluster_name;

export default elasticSlice.reducer;
