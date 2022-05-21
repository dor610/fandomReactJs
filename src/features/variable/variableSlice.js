import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    lastPage: '',
    currentPage: '/',
    ndLastPage: '',
    ndCurrentPage: '',

    isBottom: false,

    loadingAnimation: {
        isShowing: false,
        msg: "Đang tải"
    }
}

const variableSlice = createSlice({
    name: "var",
    initialState,
    reducers: {
        setCurrentPage: (state, action) =>{
            state.lastPage = state.currentPage;
            state.currentPage = action.payload;
        },
        setNdCurrentPage: (state, action) =>{
            state.ndLastPage = state.ndCurrentPage
            state.ndCurrentPage = action.payload;
        },
        setIsBottom: (state, action) =>{
            state.isBottom = action.payload;
        },

        setLoadingAnimaionShowing: (state, action) =>{
            state.loadingAnimation.isShowing = action.payload;
        },
        ssetLoadingAnimationMessage: (state, action) =>{
            state.loadingAnimation.msg = action.payload;
        }
    }
});

export const {setCurrentPage, setNdCurrentPage, setIsBottom} = variableSlice.actions;

export const {setLoadingAnimaionShowing, ssetLoadingAnimationMessage} = variableSlice.actions;

export default variableSlice.reducer;