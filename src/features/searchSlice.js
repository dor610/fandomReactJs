const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    keyword: "",
    searching: false,
    userList: [],
    postList: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword: (state, action) =>{
            state.keyword = action.payload;
        },
        setSearching: (state, action) =>{
            state.searching = action.payload;
        },
        setSearchUserList: (state, action) =>{
            state.userList  = action.userList;
        },
        setSearchPostList: (state, action) =>{
            state.postList = action.postList;
        }
    }
})

export const {setKeyword, setSearchPostList, setSearchUserList, setSearching } = searchSlice.actions;

export default searchSlice.reducer;