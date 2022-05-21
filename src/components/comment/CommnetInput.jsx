import { faFileImage, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stateFromHTML } from "draft-js-import-html";
import { size } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentReload, setCommentTarget, setPostComment, setShowingCommentInput, setSubComment } from "../../css/features/commentSlice";
import { getData, isLoggedIn } from "../../util/localStorage";
import { errorNotify, warningNotify } from "../../util/notification";
import { sendAuthPostResquest } from "../../util/utils";
import ImageTag from "../basics/ImageTag";
import TextEditor from "../editor/TextEditor";
import LoadingAnimation from "../LoadingAnimation";
import style from "./comment.module.css";

const CommentInput = ({func = null}) =>{

    const [content, setContent] = useState("");
    const [countImg, setCountImg] = useState(0);
    const [imgs, setImgs] = useState([]);
    const showing = useSelector(state => state.comment.showing);
    const targetId = useSelector(state => state.comment.targetId);
    const type = useSelector(state => state.comment.type);
    const dispatch = useDispatch();

    const [isClear, setIsClear] = useState(false);
    
    const [processing, setProsessing] = useState(false);

    let user = JSON.parse(getData("user"));

    const deleteImg = (id) =>{
        let list = [...imgs];
        console.log(list);
        list.splice(id, 1)
        setImgs(list);
        setCountImg(list.length);
    }

    const reset = () =>{
        setContent("");
        setCountImg(0);
        setImgs([]);
    }

    const close =() =>{
        reset();
        dispatch(setShowingCommentInput(false));
        dispatch(setCommentTarget(""));
    }

    const post = async () =>{
        if(!content && countImg === 0){
            warningNotify("Bạn cần nhập nội dung hoặc chọn ít nhất 1 hình ảnh")
            return
        }
        setProsessing(true);
        let data = new FormData();
        let url = "/comment/post/text";
        let contentType = "";
        data.append("content", content);
        data.append("author", user.account);
        data.append("targetId", targetId);
        console.log(imgs);
        if(countImg > 0){
            imgs.forEach(file => {
                data.append("images", file);
            });
            url = "/comment/post/img";
            contentType = "multipart/form-data";
        }
        let res = await sendAuthPostResquest(url, data, contentType);
        if(res.status === 200){
            close();
            setProsessing(false);
            dispatch(setCommentReload(true));
        }else{
            setProsessing(false);
            errorNotify("Có lỗi xảy ra khi truyền tải suy nghĩ của bạn rồi 😢");
        }
        
    }
//{countImg === 0? "Chọn ảnh": countImg + " ảnh được chọn"}
    return (
        <div className={showing? style.commentInput: style.hide}>
            { isLoggedIn()? <>
            <div>
                {type === "post"? <div>Bình luận về bài viết</div>: <div>Trả lời bình luận</div>}
                <div>
                    <TextEditor type={"create"} size={"small"} isClear={isClear} setIsClear={setIsClear} func={setContent}/>
                    <div>
                        <div className={style.commentInputImage}>
                            <input type={"file"} accept="image/*" hidden multiple id="comment-img-input" 
                                onChange={e => {setImgs(Array.from(e.target.files)); setCountImg(e.target.files.length)}}/>
                            <label htmlFor="comment-img-input" title="Hình ảnh">
                                <FontAwesomeIcon icon={faFileImage} />
                                <div>Chọn ảnh</div>
                            </label>
                        </div>
                        <button onClick={post}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <div>Đăng</div>
                        </button>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faXmark}/>
                            <div>Đóng</div>
                        </button>
                    </div>
                </div>
                <div className={style.imageContainer}>
                {imgs.map((m, i) =>{
                                return <ImageTag file={m} id={i} deleteFunc={deleteImg} key={"media_preview_"+i}/>
                            })}
                </div>
                <div className={processing? style.processingCommentInput: style.hide}>
                    <LoadingAnimation showing={processing} msg="Đang xủ lý"></LoadingAnimation>
                </div>
            </div>   
        </>: <></>
        }
        </div>
    )
}


export default CommentInput;