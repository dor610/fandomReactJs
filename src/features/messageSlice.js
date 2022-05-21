import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    current: {
        user: "",
        chatId: "",
        messageList: {},
        name: ""
    },
    friend: [],
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessageCurrentUser: (state, action) =>{
            state.current.user = action.payload;
        },
        setMessageCurrentChatId: (state, action) =>{
            state.current.chatId = action.payload;
        },
        setMessageCurrentMessageList: (state, action) =>{
            state.current.messageList = action.payload;
        },
        addMessageCurrentMessageList: (state, action) =>{
            state.current.messageList = { ...state.current.messageList,...action.payload};
        },
        addNewMessageCurrentMessageList: (state, action) =>{
            state.current.messageList = {...action.payload, ...state.current.messageList};
        },
        setMessageCurrentName: (state, action) =>{
            state.current.name = action.payload;
        },




        setFriend: (state, action) =>{
            state.friend = action.payload;
        },
        setRecentChat: (state, action) =>{
            let list = [...state.friend];
            if(list.includes(action.payload)) list.splice(list.indexOf(action.payload), 1); 
            state.friend = [action.payload, ...list];
        },
        addFriend: (state, action) =>{
            state.friend = [...state.friend, ...action.payload];
        }
    }
}) ;


export const {setMessageCurrentChatId, setMessageCurrentMessageList, setMessageCurrentUser, addMessageCurrentMessageList,
                addNewMessageCurrentMessageList, setMessageCurrentName } = messageSlice.actions;

export const { setFriend, setRecentChat, addFriend } = messageSlice.actions;

export default messageSlice.reducer;