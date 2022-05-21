import { faArrowLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCommentReload, setCommentTarget, setCommentType, setShowingCommentInput } from "../../features/commentSlice";
import { loadPostDetailAction, setPostDetail, setPostDetailStatus } from "../../features/postSlice";
import { setCurrentPage } from "../../features/variable/variableSlice";
import { isLoggedIn } from "../../util/localStorage";
import { errorNotify } from "../../util/notification";
import { Failed, Succeed } from "../../util/requestState";
import { sendGetRequest } from "../../util/utils";
import { COMMENT } from "../path";
import Post from "../post/Post";
import style from "./comment.module.css";
import CommentView from "./commentView";
import CommentInput from "./CommnetInput";

const Comment = () =>{

    const dispach = useDispatch();
    const navigate = useNavigate();
    const {postId} = useParams("postId");

    const [post, setPost] = useState({});
    const status = useSelector(state => state.post.postDetail.status);

    const [targetType, setTargetType] = useState("post");
    const [showCommentInput, setShowCommentInput] = useState(false);



    useEffect(() =>{
        dispach(setCurrentPage(COMMENT));
        loadData();
    }, []);

    useEffect(() =>{
        if(status === Failed){
            navigate("/notFound");
            errorNotify("Nội dung bạn truy cập không tồn tại :((");
        }
    });

    const loadData = async () =>{
        let res = await sendGetRequest(`/post/detail/${postId}`);
        console.log(res);
        if(res.status === 200){
            dispach(setPostDetailStatus(Succeed));
            dispach(setCommentReload(true));
            setPost(res.data);
        }else{
            dispach(setPostDetailStatus(Failed));
        }
    }

    const openCommentInput = () =>{
        dispach(setCommentTarget(postId));
        dispach(setShowingCommentInput(true));
        dispach(setCommentType("post"));
    }

    const back = () =>{
        navigate("/");
    }

    return (
        <>
            {Object.keys(post).length === 0? <></>: 
            <div className={style.comment}>
                <div>
                    <div>Bài viết</div>
                    <button onClick={back} title="Trở về">
                        <FontAwesomeIcon title="Trở về" icon={faArrowLeft} />
                    </button>
                </div>
                {post? <Post type={"normal_post"} post={post} isPostView={true}/>: <></>}
                <div className={style.commentContainer}>
                <div>
                    <div>Bình luận</div>
                   {isLoggedIn()?  <button onClick={openCommentInput}>
                        <FontAwesomeIcon icon={faPlus} />
                        <div>Thêm bình luận</div>
                    </button>: <></>}
                    </div>
                <CommentView min={true} targetId={post.id}/>
                </div>
                <CommentInput type={targetType} showing={showCommentInput}/>
            </div>}
        </>
    );
}
/*<CommentInput targetId={post.id}/>*/

export default Comment;