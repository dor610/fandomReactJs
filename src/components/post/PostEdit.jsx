import { convertFromRaw } from "draft-js";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sendAuthGetRequest } from "../../util/utils";
import style from "./post.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import MediaDescriptionInput from "../basics/MediaDescriptionInput";
import TextEditor from "../editor/TextEditor";
const PostEdit = () =>{

    let {postId} = useParams("postId");
    const navigate = useNavigate();

    const [post, setPost] = useState(undefined);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState(() => EditorState.createEmpty());

    const [images, setimages] = useState({});
    const [video, setVideo] = useState(undefined);
 
    const [newImage, setNewImage] = useState({});
    const [newVideo, setNewVideo] = useState(undefined);
    const [desForNewImg, setDesForNewImg] = useState({});
    const [desForNewVideo, setDesForNewVideo] = useState("");
    
    const [desForOldImg, setDesForOldImg] = useState({});
    const [desForOldVide, setDesForOldVideo] = useState("");

    useEffect(() =>{
        loadPost();
    }, []);


    const loadPost = async () =>{
        let res = await sendAuthGetRequest(`/post/detail/${postId}`);
        console.log(res);
        if(res.status === 200){
            setPost(res.data);
            setTitle(res.data.title);
            setContent(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.postContent))));
            if(res.data.images) setimages(res.data.images);
            if(res.data.video) setVideo(res.data.video);
        }else{
            navigate("/notFound");
        }
    }

    const onContentChange = (cs) =>{
        setContent(cs);
    }

    const deleteImg = (id) =>{
        let list = [...newImage];
        let name = list[id].name;
        list.splice(id,1);
        if(name in desForNewImg){
            let nameList = {...desForNewImg};
            delete nameList[name];
            setDesForNewImg(nameList);
        }
        setNewImage(list);
    }

    const deleteVideo = () =>{
        setNewVideo(undefined);
    }

    const setImgDescription = (id, des) =>{
        let list = {...desForNewImg};
        list[id] = des;
        setDesForNewImg(list);
    }

    const setVideoDescription = (name, des) =>{
        setDesForNewVideo(des);
    }

    return(
        <>
        {post? <div className={style.postEdit}>
            <div className={style.postHeader}>
                    <div>Chỉnh sửa bài viết</div>
                    <button title="Lưu chỉnh sửa">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        <div>Lưu</div>
                    </button>
            </div>
            <form className={style.createForm}>
                <div className={style.formElement}>
                    <div>Tiêu đề</div>
                    <input required={true} value={title} onChange={e => {setTitle(e.currentTarget.value)}} type="text" />
                </div>
                <div className={style.formElement}>
                    <div>Nội dung</div>
                    <TextEditor type={"edit"} data={post.postContent} func={setContent}/>
                </div>
                <div className={style.formElement}>
                    <div>Hình ảnh</div>
                    <input onChange={e => { setNewImage(Array.from(e.target.files))}} id="post-create-image" type="file" multiple hidden/>
                    <label title="Choose files" htmlFor="post-create-image">Chọn hình ảnh</label>
                </div>
                <div className={style.formElement}>
                    <div>Video</div>
                    <input onChange={e => { setNewVideo(e.target.files[0])}} id="post-create-video" type="file" hidden/>
                    <label title="Choose file" htmlFor="post-create-video">{!newVideo? "Chọn video": video.name}</label>
                </div>
                <div className={style.mediaContainer}>
                        {Object.keys(images).map((m, i) =>{
                            return <MediaDescriptionInput file={images[m]} url={images[m].url} id={i} value={images[m].description} func={setImgDescription} type="IMAGE" deleteFunc={deleteImg}  key={"image_preview_"+i}/>
                        })}
                        {video? <MediaDescriptionInput file={video}  url={video.url} value={video.description} func={setVideoDescription} type="VIDEO" deleteFunc={deleteVideo}/>: <></>}
                    </div>
            </form>

        </div>: <></>}
        </>
    )
}

export default PostEdit;