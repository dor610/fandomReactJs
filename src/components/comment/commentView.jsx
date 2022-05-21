import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostComment, setCommentReload, setPostComment } from "../../features/commentSlice";
import { setIsBottom } from "../../features/variable/variableSlice";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../util/requestState";
import { sendGetRequest } from "../../util/utils";
import LoadingAnimation from "../LoadingAnimation";
import style from "./comment.module.css";
import CommentDetail from "./CommentDetail";

const CommentView = ({targetId, min = false}) => {
   
        const dispatch = useDispatch();

        const isBottom = useSelector(state => state.variable.isBottom);
        //let loadShowing = false;

        const [page, setPage] = useState(1);
        const [status, setStatus] = useState(Idle);
        const [comments, setComments] = useState({});
        const isReload = useSelector(state => state.comment.reload);

        useEffect(() =>{
                if(isReload){
                    commentFirstLoad();
                }
        },[isReload])
    
        useEffect(() =>{
                if(isBottom){
                    loadComment();
                }
        
                if(status === Succeed){
                    //console.log(comments);
                }
        });
    

    const commentFirstLoad = async () =>{
        let url = `/comment/get/${targetId}/0`;
        console.log(url);
        let res = await sendGetRequest(url);
        console.log(res);
        if(res.status === 200){
            if(Object.keys(res.data).length === 0) setStatus(NoContent);
            else {
                setComments(res.data);
                setStatus(Succeed);
                dispatch(setIsBottom(false));
                dispatch(setCommentReload(false))
            }
        }else{
            setStatus(Failed);
        }
    }    

    const loadComment = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);
            let url = `/comment/get/${targetId}/${page}`;
            let res = await sendGetRequest(url);
            //console.log(res);
            //console.log(url);
            if(res.status === 200){
                if(Object.keys(res.data).length === 0) setStatus(NoContent);
                else{
                    setComments({...comments, ...res.data});
                    setStatus(Succeed);
                    setPage(page + 1);
                    dispatch(setIsBottom(false));
                }
            }else{
                setStatus(Failed);
            }
        }
    }

    const deleteComment = (id) =>{
        if(comments[id]) delete comments[id];
    }

    return (
       <>{comments? <>
        <div className={style.commentView}> 
                {Object.keys(comments).map((c, i) =>{
                    return <CommentDetail comment={comments[c]} key={i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={isBottom && status !== NoContent} msg='Đang tải'/>
            </div></>:<></>
       }
       </>
    )
}

export default CommentView;