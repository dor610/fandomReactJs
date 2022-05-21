import { useEffect, useState } from "react";
import style from "./post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import { getData, isLoggedIn } from "../../util/localStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrPath } from "../../features/pathSlice";
import { errorNotify, successNotify, warningNotify } from "../../util/notification";
import { resetPostCreating, setPostCreatingStatus } from "../../features/postSlice";
import { sendAuthPostResquest } from "../../util/utils";
import { Failed, Pending, Succeed } from "../../util/requestState";
import { setLoadingAnimaionShowing, ssetLoadingAnimationMessage } from "../../features/variable/variableSlice";
import MediaDescriptionInput from "../basics/MediaDescriptionInput";
import TextEditor from "../editor/TextEditor";

const PostCreate = ({postType}) =>{

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImages] = useState([]);
    const [imgDes, setImgDes] = useState({});
    const [video, setVideo] = useState(undefined);
    const [videoDes, setVideoDes] = useState("");
    const [count, setCount] = useState(0);


    const status = useSelector(state => state.post.postCreating.status);
    const user = JSON.parse(getData("user"));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() =>{
        if(status === Pending){
            dispatch(setLoadingAnimaionShowing(true));
            dispatch(ssetLoadingAnimationMessage("Đang xử lý"))
        }
        if(status === Succeed){
            successNotify("Tạo bài viết thành công. Bài viết của bạn đang chờ duyệt.", "postcreate_successfully");
            dispatch(resetPostCreating());
            dispatch(setLoadingAnimaionShowing(false));
            setTimeout(()=>{
                navigate("/");
            }, 2000);
        }
        if(status === Failed){
            errorNotify("Đã xảy ra lỗi, vui lòng thực hiện lại!", "postcreate_error");
            dispatch(resetPostCreating());
            dispatch(setLoadingAnimaionShowing(false));
        }
    });

    useEffect(() => {
        dispatch(setCurrPath(location.pathname));
        if(!isLoggedIn()){
            warningNotify("Bạn cần đăng nhập để truy cập nội dung này", "access_denied");
            navigate("/login");
        }
    }, []);

    const createPost = async () =>{
        if(!postValidate()) return;
        
        dispatch(setPostCreatingStatus(Pending));
        let data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("author", user.account);

        if(image.length !== 0){
            image.forEach(file => {
                data.append("images", file);
                if(imgDes[file.name]) data.append("imgDesciption", imgDes[file.name]);
                else data.append("imgDesciption", "Mô tả");    
            });
        }    

        if(video){
            data.append("video", video);
            if(videoDes) data.append("videoDescription",videoDes);
            else data.append("videoDescription", "");
        }    

        if(video && image.length > 0){
            let vRes = await sendAuthPostResquest("/post/create/img_video", data, "multipart/form-data");
                if(vRes.status === 200){
                    dispatch(setPostCreatingStatus(Succeed));
                }else{
                    dispatch(setPostCreatingStatus(Failed));
                }
                return;
        }

        if(video){
            let vRes = await sendAuthPostResquest("/post/create/video", data, "multipart/form-data");
                if(vRes.status === 200){
                    dispatch(setPostCreatingStatus(Succeed));
                }else{
                    dispatch(setPostCreatingStatus(Failed));
                }
               return;
        }

        if(image.length > 0){
            let iRes = await sendAuthPostResquest("/post/create/img", data, "multipart/form-data");
                if(iRes.status === 200){
                    dispatch(setPostCreatingStatus(Succeed));
                }else{
                    dispatch(setPostCreatingStatus(Failed));
                }
                return;
        }
        
        let tRes = await sendAuthPostResquest("/post/create/text", data, "");
                if(tRes.status === 200){
                    dispatch(setPostCreatingStatus(Succeed));
                }else{
                    dispatch(setPostCreatingStatus(Failed));
                }     
    }

    const deleteImg = (id) =>{
        let list = [...image];
        let name = list[id].name;
        list.splice(id,1);
        if(name in imgDes){
            let nameList = {...imgDes};
            delete nameList[name];
            setImgDes(nameList);
        }
        setImages(list);
        setCount(list.length);
    }

    const deleteVideo = () =>{
        setVideo(undefined);
    }

    const setImgDescription = (id, des) =>{
        let list = {...imgDes};
        list[id] = des;
        setImgDes(list);
    }

    const setVideoDescription = (name, des) =>{
        setVideoDes(des);
    }

    const postValidate = () =>{
        let isValid = true;
        let msg = "";
        if(title === ""){
            isValid = false;
            msg+= "Tiêu đề không được để trống";
        }

        if(image.length === 0 && !video){
            if(!content){
                isValid = false;
                if(msg.length === 0) msg+= "Bài viết phải có nội dung văn bản, hình ảnh hoặc video."
                else msg+= ", bài viết phải có nội dung văn bản, hình ảnh hoặc video."
            }
        }
        
        if(!isValid) warningNotify(msg, "postvalidation");
        return isValid;
    }

    const postReset = () =>{
        setTitle("");
        setContent("");
        setImages([]);
        setVideo(undefined);
        setCount(0);
    }

    return (
        <div className={style.postEdit}>
            <div className={style.postHeader}>
                    <div>Tạo bài viết</div>
                    <button onClick={createPost} title="Đăng bài viết">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        <div>Đăng</div>
                    </button>
            </div>
            <form className={style.createForm}>
                <div className={style.formElement}>
                    <div>Tiêu đề</div>
                    <input required={true} value={title} onChange={e => {setTitle(e.currentTarget.value)}} type="text" />
                </div>
                <div className={style.formElement}>
                    <div>Nội dung</div>
                    <TextEditor type={"create"} func={setContent} />
                </div>
                <div className={style.formElement}>
                    <div>Hình ảnh</div>
                    <input accept="image/*" onChange={e => { setImages(Array.from(e.target.files)) ;setCount(e.currentTarget.files.length)}} id="post-create-image" type="file" multiple hidden/>
                    <label title="Choose files" htmlFor="post-create-image">{count === 0? "Chọn hình ảnh": count + " hình ảnh được chọn."}</label>
                </div>
                <div className={style.formElement}>
                    <div>Video</div>
                    <input accept="video/*" onChange={e => { setVideo(e.target.files[0]) ;setCount(e.currentTarget.files.length)}} id="post-create-video" type="file" hidden/>
                    <label title="Choose file" htmlFor="post-create-video">{!video? "Chọn video": video.name}</label>
                </div>
                <div className={style.mediaContainer}>
                        {image.map((m, i) =>{
                            return <MediaDescriptionInput file={m} id={i} func={setImgDescription} type="IMAGE" deleteFunc={deleteImg}  key={"image_preview_"+i}/>
                        })}
                        {video? <MediaDescriptionInput file={video} func={setVideoDescription} type="VIDEO" deleteFunc={deleteVideo}/>: <></>}
                    </div>
            </form>
        </div>
    )
}

export default PostCreate;