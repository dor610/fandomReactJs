import "../../css/basic.css";
import style from "./post.module.css";
import PostHeader from "./PostHeader";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setIsBottom } from "../../features/variable/variableSlice";
import { setCurrPath } from "../../features/pathSlice";
import { useEffect, useState } from "react";
import { HOME } from "../path";
import { getData, isLoggedIn } from "../../util/localStorage";
import { addPostLoading, loadPostAction, setPostLoading, setPostLoadingStatus } from "../../features/postSlice";
import { Failed, NoContent, Pending, Succeed } from "../../util/requestState";
import LoadingAnimation from "../LoadingAnimation"
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavBar from "../admin/AdminNavBar";
import { sendGetRequest } from "../../util/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostView = () =>{
    const dispatch = useDispatch();
    const page = useSelector(state => state.post.postLoading.page);
    const posts = useSelector(state => state.post.postLoading.postList);
    const status = useSelector(state => state.post.postLoading.status);
    const isBottom = useSelector(state => state.variable.isBottom);
    const isReload = useSelector(state => state.post.isReload);
    const location = useLocation();
    let loadShowing = false;

    useEffect(() =>{
        dispatch(setCurrentPage(HOME));
        dispatch(setCurrPath(location.pathname));
        if(page === 0){
            dispatch(setPostLoadingStatus(Pending));
            dispatch(loadPostAction(page));
        }
    }, []);

    useEffect(() =>{
        firstLoad();
    }, []);


    useEffect(() =>{
        if(isReload) firstLoad();
    }, [isReload]);

    useEffect(() => {
        if(isBottom){
            loadPost();
        }
    })

    const firstLoad = async () =>{
        dispatch(setPostLoadingStatus(Pending));
            let res = await sendGetRequest(`/post/0`);
            dispatch(setPostLoading(res.data));
            if(res.status === 200){
                if(Object.keys(res.data).length === 0) dispatch(setPostLoadingStatus(NoContent))
                else dispatch(setPostLoadingStatus(Succeed))
            }else{
                dispatch(setPostLoadingStatus(Failed))
            }
            dispatch(setIsBottom(false))
    }



    const loadPost = async () =>{
        if(status !== NoContent && status !== Pending){
            dispatch(setPostLoadingStatus(Pending));
            let res = await sendGetRequest(`/post/${page}`);
            dispatch(addPostLoading(res.data));
            if(res.status === 200){
                if(Object.keys(res.data).length === 0) dispatch(setPostLoadingStatus(NoContent))
                else dispatch(setPostLoadingStatus(Succeed))
            }else{
                dispatch(setPostLoadingStatus(Failed))
            }
            dispatch(setIsBottom(false))
        }
     }

    return (
        <div className={style.postView}>
            <PostHeader />
            {Object.keys(posts).map(function(p, i){
                return <Post type={"normal_post"} post={posts[p]} key={"post_"+i}/>
            })}
            <div>
                <LoadingAnimation showing={isBottom && status !== NoContent} msg='Đang tải'/>
            </div>
        </div>
    );
}

export default PostView;