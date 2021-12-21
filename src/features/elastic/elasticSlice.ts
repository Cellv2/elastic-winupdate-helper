import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { ElasticNodeInfo } from "../../types/elastic.types";
import { getClusterStats } from "./elastic.service";

export type ElasticState = {
    value: number;
    status: "idle" | "loading" | "failed";
    nodes: ElasticNodeInfo[]; // _cat/nodes?v=true&h=heap.percent,ram.percent,cpu,master,name,u
};

const initialState: ElasticState = {
    value: 0,
    status: "idle",
    nodes: [],
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
            state.nodes = action.payload;
        });
        builder.addCase(getNodeInfoAsync.rejected, (state) => {
            state.status = "failed";
        });
    },
});

export const {} = elasticSlice.actions;

export const selectClusterInfo = (state: RootState) => state.elastic.nodes;

export default elasticSlice.reducer;
