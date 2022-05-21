import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    profile: {},
    isReload: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        setProfile: (state, action) =>{
            state.profile = action.payload;
        },
        setIsReloadProfile: (state, action) =>{
            state.isReload = action.payload;
        }
    }
})


export const { setIsReloadProfile, setProfile } = profileSlice.actions;

export default profileSlice.reducer;