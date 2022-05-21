import { createAction, createSlice } from "@reduxjs/toolkit";
import {Idle} from "../util/requestState";

const initialState = {
    postCreating: {
        status: Idle,
    },
    postLoading: {
        status: Idle,
        postList: {},
        page: 0,
        isReload: false,
    },
    postDetail: {
        status: Idle,
        post: undefined
    },

    pendingApprovePost: {
        post: {},
        page: 0
    },
    lockedPost: {
        post: {},
        page: 0
    },
    approvedPost: {
        post: {},
        page: 0,
    },
    removedPost: {
        post: {},
        page: 0,
    },

    userPost: {
        pending: {},
        approved: {},
        locked: {},
        deleted: {},
    },

    isReload: false,
};

export const createTextPostAction = createAction("post/createText");
export const createImagePostAction = createAction("post/createImg");
export const createVideoPostAction = createAction("post/createVideo");

export const loadPostAction = createAction("post/loadPost");

export const loadPostDetailAction = createAction("post/loadPostDetail");

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostCreatingStatus: (state, action) => {
            state.postCreating.status = action.payload;
        },
        resetPostCreating: (state, action) =>{
            state.postCreating.status = Idle;
        },

        setPostLoading: (state, action) =>{
            state.postLoading.postList = action.payload;
        },
        addPostLoading: (state, action) =>{
            let posts = state.postLoading.postList;
            state.postLoading.postList = {...posts, ...action.payload}
            state.postLoading.page = state.postLoading.page + 1;
        },
        setPostLoadingStatus: (state, action) =>{
            state.postLoading.status = action.payload;
        },
        removeFromPostLoading: (state, action) =>{
            let list = {...state.postLoading.postList};
            delete list[action.payload];
            state.postLoading.postList = list;
        },
        setIsReloadPostView: (state, action) =>{
            state.postLoading.isReload = action.payload;
        },

        setPostDetail: (state, action) =>{
            state.postDetail.post = action.payload;
        },
        setPostDetailStatus: (state, action) =>{
            state.postDetail.status = action.payload;
        },

        setPendingApprovePost: (state, action) =>{
            state.pendingApprovePost.post = {...state.pendingApprovePost.post, ...action.payload};
            state.pendingApprovePost.page = state.pendingApprovePost.page + 1;
        },
        removePostFromPending: (state, action) =>{ 
            let list  = {...state.pendingApprovePost.post};
            delete list[action.payload];
            state.pendingApprovePost.post = list;
        },
        
        setLockedpost: (state, action) =>{
            state.lockedPost.page = state.lockedPost.page + 1;
            state.lockedPost.post = {...state.lockedPost.post, ...action.payload};
        },
        removePostFromLocked: (state, action) =>{
            let list = {...state.lockedPost.post};
            delete list[action.payload];
            state.lockedPost.post = list;
        },

        setRemovedPost: (state, action) =>{
            state.removedPost.page = state.removedPost.page + 1;
            state.removedPost.post = {...state.removedPost.post, ...action.payload};
        },
        removePostFromRemoved: (state, action) =>{
            let list = {...state.removedPost.post};
            delete list[action.payload];
            state.removedPost.post = list;
        },

        setApprovedPost: (state, action) =>{
            state.approvedPost.page = state.approvedPost.page + 1;
            state.approvedPost.post = {...state.approvedPost.post, ...action.payload};
        },
        removePostFromApproved: (state, action) =>{
            let list = {...state.approvedPost.post};
            delete list[action.payload];
            state.approvedPost.post = list;
        },

        setUserPost: (state, action) =>{
            if(action.payload.type === "pending")
                state.userPost.pending = action.payload.data;
            if(action.payload.type === "approved")
                state.userPost.approved = action.payload.data;
            if(action.payload.type === "locked")
                state.userPost.locked = action.payload.data;
            if(action.payload.type === "deleted")
                state.userPost.deleted = action.payload.data;        
        },

        setPostIsReload: (state, action) =>{
            state.isReload = action.payload;
        }
    }
});

export const { setPostCreatingStatus, resetPostCreating} = postSlice.actions; 

export const { addPostLoading, setPostLoadingStatus, removeFromPostLoading, setPostLoading } = postSlice.actions;

export const { setPostDetail, setPostDetailStatus } = postSlice.actions;

export const { setPendingApprovePost, removePostFromPending } = postSlice.actions;

export const { setLockedpost, removePostFromLocked } = postSlice.actions;

export const { setApprovedPost, removePostFromApproved} = postSlice.actions;

export const { setRemovedPost } = postSlice.actions;

export const { setUserPost } = postSlice.actions;

export const { setPostIsReload } = postSlice.actions;

export default postSlice.reducer;