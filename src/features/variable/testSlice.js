import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = "Hiiiiii";

export const setData = createAction("test/setData");

const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setTest: (state, action) =>{
            return action.payload;
        }
    }
});

export const {setTest} = testSlice.actions;

export default testSlice.reducer;