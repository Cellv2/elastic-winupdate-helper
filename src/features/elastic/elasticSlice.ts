import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface ElasticState {
    value: number;
    status: "idle" | "loading" | "failed";
}

const initialState: ElasticState = {
    value: 0,
    status: "idle",
};

export const elasticSlice = createSlice({
    name: "elastic",
    initialState,
    reducers: {},
});

export const {} = elasticSlice.actions;

export default elasticSlice.reducer;
