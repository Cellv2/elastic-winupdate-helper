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
    clusterHealth: ElasticClusterHealth | null;
    masterNodeName: string;
    nodeStats: ElasticNodeInfo[]; // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
};

const initialState: ElasticState = {
    value: 0,
    status: "idle",
    clusterHealth: null,
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
            state.clusterHealth = action.payload?.clusterHealth ?? null;
            state.masterNodeName = action.payload?.masterNodeName ?? "Unknown";
            state.nodeStats = action.payload?.nodeStats;
        });
        builder.addCase(getNodeInfoAsync.rejected, (state) => {
            state.status = "failed";
            state.clusterHealth = null;
            state.masterNodeName = "Unknown";
            state.nodeStats = [];
        });
    },
});

export const {} = elasticSlice.actions;

export const selectClusterNodeStats = (state: RootState) =>
    state.elastic.nodeStats;

export const selectClusterName = (state: RootState) =>
    state.elastic.clusterHealth?.cluster_name;

export default elasticSlice.reducer;
