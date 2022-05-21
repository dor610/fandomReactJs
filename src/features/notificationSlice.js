import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    list: {},
    page: 1
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) =>{
            state.list = action.payload;
        },
        addNotification: (state, action) =>{
            state.list = {...state.list, ...action.payload};
        },
        deleteNotification: (state, action) =>{
            let list = {...state.list};
            if(list[action.payload]) delete list[action.payload];
            state.list = list;
        },
        setNotificationPage: (state, action) =>{
            state.page = action.payload;
        }
    }
})


export const { setNotification, addNotification, deleteNotification, setNotificationPage } = notificationSlice.actions;

export default notificationSlice.reducer;