import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    targetId: "",
    targetName: "",
    showing: false,
    type: "post",
    reload: false,
    postComment: {},
    subComment: {},

}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setCommentTarget: (state, action) =>{
            state.targetId = action.payload;
        },
        setShowingCommentInput: (state, action) =>{
            state.showing = action.payload;
        },
        setCommentType: (state, action) =>{
            state.type = action.payload;
        },

        setPostComment: (state, action) =>{
            state.postComment = action.payload;
        },
        setSubComment: (state, action) =>{
            state.subComment = action.payload;
        },
        addPostComment: (state, action) =>{
            state.postComment = {...state.postComment, ...action.payload};
        },
        addSubComment: (state, action) => {
            state.subComment = {...state.subComment, ...action.payload};
        },

        setCommentReload: (state, action) =>{
            state.reload = action.payload;
        },

        deleteComment: (state, action) =>{
            if(state.postComment[action.payload]){
                state.postComment = {};
                state.subComment = {};
               /* console.log("post comment");
                let list = {...state.postComment};
                delete list[action.payload];
                state.postComment = list;
                if(state.subComment[action.payload]){
                    let cmts = {...state.subComment};
                    delete cmts[action.payload];
                    state.subComment = cmts;
                }*/
            }else{
                state.subComment = {};
               /* console.log("sub comment");
                let list = {...state.subComment};
                let keys = Object.keys(list);
                for(let i = 0; i < keys.length; i++){
                    if(list[keys[i]][action.payload]){
                        delete list[keys[i]][action.payload];
                        state.subComment = list;
                        break;
                    }
                }*/
            }
        }
    }
})

export const { setCommentTarget, setShowingCommentInput, setCommentType, setCommentReload } = commentSlice.actions;

export const { setPostComment, setSubComment, addPostComment, addSubComment, deleteComment} = commentSlice.actions;

export default commentSlice.reducer;