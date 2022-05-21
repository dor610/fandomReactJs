import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubComment, setCommentReload, setCommentTarget, setCommentType, setShowingCommentInput, setSubComment } from "../../features/commentSlice";
import { setPostIsReload } from "../../features/postSlice";
import { isLoggedIn } from "../../util/localStorage";
import { Idle } from "../../util/requestState";
import { sendGetRequest } from "../../util/utils";
import MediaViewer from "../basics/MediaViewer";
import TextEditor from "../editor/TextEditor";
import PostFuncBar from "../post/PostFuncBar";
import PostTitle from "../post/PostTitle";
import style from "./comment.module.css";
import CommentView from "./commentView";
import CommentInput from "./CommnetInput";

const CommentDetail = ({comment = null, type = "normal_comment"}) =>{
    const [openComment, setOpenComment] = useState(false);
    
    const commentList = useSelector(state => state.comment.subComment[comment.id]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(Idle);
    const isReload = useSelector(state => state.comment.reload);

    const dispatch = useDispatch();

    useEffect(() =>{
        console.log(isReload);
        if(type !== "sub_comment")
            if(!commentList || isReload){
                commentFirstLoad();
            }
    }, [commentList,isReload,  type]);

    const reply = () =>{
        dispatch(setCommentTarget(comment.id));
        dispatch(setShowingCommentInput(true));
        dispatch(setCommentType("comment"));
    }


    const commentFirstLoad = async () =>{
        let res = await sendGetRequest(`/comment/get/${comment.id}/0`);
        console.log(res);
        if(res.status === 200){
            let cmt ={}
            cmt[comment.id] = res.data;
            dispatch(addSubComment(cmt));
            dispatch(setCommentReload(false));
        }
    }
    
    const getComment = async () =>{
        let res = await sendGetRequest(`/comment/get/${comment.id}/${page}`);
        console.log(res);
        if(res.status === 200){
            dispatch(addSubComment(res.data));
            setPage(page + 1);
        }
    }

    /*{openComment? <div className={style.commentDetailComment}>
                        {isLoggedIn()? <CommentInput  type="comment"/>:<></>}
                        <CommentView targetId={comment.id} />
                    </div>: <></>}*/
//<textarea value={comment.content} />

    return (
        <>
            {comment? 
                <div className={style.commentDetail}>
                    <PostTitle author={comment.author} timestamp={comment.timestamp} />
                    <div className={style.commetnContent}>
                        <TextEditor type={"display"} data={comment.content} />
                        {comment.type === "IMAGE"? 
                            <MediaViewer images={comment.image} type={"IMAGE"}/>: <></>}
                    </div>
                    <PostFuncBar func={reply} type={type} author={comment.author} targetId={comment.id}/>
                    {type !== "sub_comment" && commentList? 
                    <div className={style.subComment}>
                        {Object.keys(commentList).map((c, i) =>{
                            return <CommentDetail comment={commentList[c]} type={"sub_comment"} key={"sub_comment_" +comment.timestamp+ "_" + i}/>
                        })}
                    </div>:<></>}
                </div>
            :<></>}
        </>
    )
}

export default CommentDetail;