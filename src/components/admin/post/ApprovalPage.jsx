import { faArrowLeft, faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPendingApprovePost } from "../../../features/postSlice";
import { setCurrentPage, setIsBottom } from "../../../features/variable/variableSlice";
import { getData, isLoggedIn } from "../../../util/localStorage";
import { errorNotify, successNotify } from "../../../util/notification";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest, sendGetRequest } from "../../../util/utils";
import LoadingAnimation from "../../LoadingAnimation";
import Post from "../../account/post/Post";
import style from "./post.module.css";
import { setAdminPostPage } from "../../../features/adminSlice";


const ApprovalPage = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(Idle);
    const [count, setCount] = useState(0);

    const postList = useSelector(state => state.post.pendingApprovePost.post);
    const page = useSelector(state => state.post.pendingApprovePost.page)
    const isBottom = useSelector(state => state.variable.isBottom);

    useEffect(() =>{
        dispatch(setAdminPostPage("pending"));
        if(isLoggedIn()){
            setUser(JSON.parse(getData("user")));
            if(JSON.parse(getData("user")).role !== "ADMIN"){
                navigate("/accessDenied");
            }
        }

        loadPost();
        getCount();
    }, []);

    useEffect(() =>{
        if(isBottom){
            loadPost();
        }
    })

    const getCount = async () =>{
        let res = await sendGetRequest("/post/count/pending");
        if(res.status === 200){
            setCount(res.data);
        }
    }

    const loadPost = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);

            let res = await sendAuthGetRequest(`/post/pending/${page}`);
            console.log(res);
            if(res.status === 200){
                if(Object.keys(res.data).length === 0) setStatus(NoContent);
                else{
                    dispatch(setPendingApprovePost(res.data));
                    setStatus(Succeed);
                }
                dispatch(setIsBottom(false));
            }else{
                dispatch(setIsBottom(false));
                setStatus(Failed);
                errorNotify("Có lỗi gì đó đã xảy ra 😔");
            }
        }
    }

    return(
        <div className={style.approvalPost}>            
            <div>Có {count} bài viết đang chờ duyệt</div>
            <div className={style.container}>
            {Object.keys(postList).map(function(p, i){
                    return <Post isPostView={true} type={"pending_post"} post={postList[p]} key={"post_"+i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={status === Pending} msg='Đang tải'/>
            </div>
        </div>
    )
}

export default ApprovalPage;