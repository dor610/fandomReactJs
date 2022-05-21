import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    prevPath: "",
    currPath: "/"
}

const pathSlice  = createSlice({
    name: "path",
    initialState,
    reducers: {
        setCurrPath: (state, action) =>{
            if(state.currPath !== action.payload){
                state.prevPath = state.currPath;
                state.currPath = action.payload;
            }
        }
    }
})


export const { setCurrPath } = pathSlice.actions;
export default pathSlice.reducer;