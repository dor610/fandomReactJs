
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLockedpost} from "../../../features/postSlice";
import { setCurrentPage, setIsBottom } from "../../../features/variable/variableSlice";
import { getData, isLoggedIn } from "../../../util/localStorage";
import { errorNotify } from "../../../util/notification";
import { Failed, Idle, NoContent, Pending, Succeed } from "../../../util/requestState";
import { sendAuthGetRequest, sendGetRequest } from "../../../util/utils";
import LoadingAnimation from "../../LoadingAnimation";
import Post from "../../account/post/Post";
import style from "./post.module.css";
import { setAdminPostPage } from "../../../features/adminSlice";

const LockedPage = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(Idle);
    const [count, setCount] = useState(0);

    const postList = useSelector(state => state.post.lockedPost.post);
    const page = useSelector(state => state.post.lockedPost.page)
    const isBottom = useSelector(state => state.variable.isBottom);

    useEffect(() =>{
        dispatch(setAdminPostPage("locked"));
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
        let res = await sendGetRequest("/post/count/locked");
        if(res.status === 200){
            setCount(res.data);
        }
    }

    const loadPost = async () =>{
        if(status !== NoContent && status !== Pending){
            setStatus(Pending);

            let res = await sendAuthGetRequest(`/post/locked/${page}`);
            console.log(res);
            if(res.status === 200){
                if(Object.keys(res.data).length === 0) setStatus(NoContent);
                else{
                    dispatch(setLockedpost(res.data));
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
            <div>Có {count} bài viết bị khoá</div>
            <div className={style.container}>
                {Object.keys(postList).map(function(p, i){
                    return <Post isPostView={true} type={"locked_post"} post={postList[p]} key={"post_"+i}/>
                })}
            </div>
            <div>
                <LoadingAnimation showing={status === Pending} msg='Đang tải'/>
            </div>
        </div>
    )
}

export default LockedPage;