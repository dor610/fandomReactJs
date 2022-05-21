import { createSlice, createAction } from "@reduxjs/toolkit";
import { Idle } from "../util/requestState";

const initialState = {
    user: {},
    authToken: "",
    postPage: "pending",
    signup: {
        isSuccess: false,
        isError: false,
        errorCode: 0
    },
    login: {
        isSuccess: false,
        isError: false,
        errorCode: 0
    },
    detailUser:{
        status: Idle,
        user: {}
    },

    userList: {
        list: {},
        page: 0,
    },

    bannedUser: {
        list: {},
        page: 0
    }
};

export const actionLoadUserData = createAction("user/loadUserData");
export const actionLoadUserBasicData = createAction("user/loadBasicData");
export const actionCreateAccount = createAction("user/createAccount");
export const actionLogin = createAction("user/login");

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload;
        },

        setAuthToken: (state, action) =>{
            state.authToken = action.payload;
        },

        setUserPostPage: (state, action) =>{
            state.postPage = action.payload;
        },

        setSignupSuccess: (state, action) =>{
            state.signup.isSuccess = action.payload;
        },
        setSignupError: (state, action) =>{
            state.signup.isError = action.payload.isError;
            state.signup.errorCode = action.payload.errorCode;
        },
        setLoginSuccess: (state, action) =>{
            state.login.isSuccess = action.payload;
        },
        setLoginError: (state, action) =>{
            state.login.isError = action.payload.isError;
            state.login.errorCode = action.payload.errorCode;
        },

        setDetailUser: (state, action) =>{
            state.detailUser.user = action.payload;
        },
        setDetailUserStatus: (state, action) =>{
            state.detailUser.status = action.payload;
        },


        setUserList: (state, action) =>{
            state.userList.page = state.userList.page + 1;
            state.userList.list = {...state.userList.list, ...action.payload};
        },
        removeUserFromUserList: (state, action) =>{
            let list = {...state.userList.list};
            delete list[action.payload];
            state.userList.list = list;
        },

        setBannedUser: (state, action) =>{
            state.bannedUser.page = state.bannedUser.page + 1;
            state.bannedUser.list = {...state.bannedUser.list, ...action.payload};
        },
        removeUserFromBannedUser: (state, action) =>{
            let list = {...state.bannedUser.list};
            delete list[action.payload];
            state.bannedUser.list = list;
        }
    }

})

export const {setUser, setLoginSuccess, setSignupError, setLoginError, setSignupSuccess, setAuthToken } = userSlice.actions;

export const { setDetailUser, setDetailUserStatus, setUserPostPage } = userSlice.actions;

export const { setUserList, removeUserFromUserList } = userSlice.actions;

export const { setBannedUser, removeUserFromBannedUser } = userSlice.actions;

export default userSlice.reducer;