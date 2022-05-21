import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    post: {
        page: "pending",
        
    },
    user: {
        page: "all",
    }
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminPostPage: (state, action) =>{
            state.post.page = action.payload;
        },





        setAdminUserPage: (state, action) =>{
            state.user.page = action.payload;
        }
    }
})


export const { setAdminPostPage } = adminSlice.actions;

export const { setAdminUserPage } = adminSlice.actions;

export default adminSlice.reducer;