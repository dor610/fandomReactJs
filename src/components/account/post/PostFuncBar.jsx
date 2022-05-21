import { faBan, faBars, faCircleChevronLeft, faLockOpen, faSquarePen, faTrash, faTrashCan, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePostFromApproved, removePostFromLocked, removePostFromPending, setPostIsReload, setUserPost } from "../../../features/postSlice";
import { successNotify, errorNotify } from  "../../../util/notification"; 
import { sendAuthPostResquest } from "../../../util/utils";
import DeleteForm from "../../basics/DeleteForm";
import style from "./post.module.css";
import style2 from "../../post/post.module.css";
import LockForm from "../../basics/LockForm";

const PostFuncBar = ({type, id}) =>{

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const navigate = useNavigate();

    const getPost = (state) =>{
        switch (type){
            case "pending": return state.post.userPost.pending;
            case "approved": return state.post.userPost.approved;
            case "locked": return state.post.userPost.locked;
            case "delete": return state.post.userPost.deleted;
            default: ;
        }
    }

    const post = useSelector(state => getPost(state));
    const dispatch = useDispatch();

    const deletePost = async () =>{
        let data = new FormData();
        data.append("postId", id);
        data.append("note","Bị xoá bởi người dùng")
        let res = await sendAuthPostResquest("/post/delete", data, "");
        if(res.status === 200){
            let postObj = {...post};
            delete postObj[id];
            dispatch(setUserPost({type:"pending", data: postObj}));
            successNotify("Xoá bài viết thành công");
            dispatch(setPostIsReload(true));
        }else{
            errorNotify("Đã xảy ra lỗi!");
        }
    }

    const lockPost = async (msg) =>{
        let data = new FormData();
        data.append("postId", id);
        data.append("note", msg);
        let res = await sendAuthPostResquest(`/post/locked`, data);
        if(res.status === 200){
            successNotify("Bài viết đã bị khoá!")
            dispatch(removePostFromApproved(id));
            dispatch(setPostIsReload(true));
        }else{
            errorNotify("Đã có lỗi xảy ra.");
        }
    }

    const editpost = () =>{
        navigate(`/post/edit/${id}`);
    }

    const deleteLockedPost = async (msg) =>{
        let data = new FormData();
        data.append("postId", id);
        data.append("note", msg);

        let res = await sendAuthPostResquest(`/post/delete`, data);
        if(res.status === 200){
            successNotify("Bài viết đã được xoá!")
            dispatch(setPostIsReload(true));
            if(type === "pending_post")
                dispatch(removePostFromPending(id));
            if(type === "locked_post")
                dispatch(removePostFromLocked(id)); 
            dispatch(setPostIsReload(true));    
        }else{
            errorNotify("Đã có lỗi xảy ra.");
        }
    }

    const approve = async () =>{
        let res = await sendAuthPostResquest(`/post/approval/${id}`, "");
        if(res.status === 200){
            successNotify("Bài viết đã được duyệt!");
            dispatch(removePostFromPending(id));
            dispatch(setPostIsReload(true));
        }else{
            errorNotify("Đã có lỗi xảy ra.");
        }
    }

    const unLockpost = async () =>{
        let res = await sendAuthPostResquest(`/post/unlock/${id}`);
        if(res.status === 200){
            successNotify("Bài viết đã được mở khoá!")
            dispatch(removePostFromLocked(id));  
            dispatch(setPostIsReload(true));  
        }else{
            errorNotify("Đã có lỗi xảy ra.");
        }
    }

    const openPostDetailPage = () =>{
        navigate(`/post/comment/${id}`);
    }

    if(type === "pending_post"){
        return (
            <div className={style2.subPostFuncBar}>
                <LockForm func={deleteLockedPost} showing={showDeleteForm}  setShowing={setShowDeleteForm}/>
                <div onClick={approve} title="Duyệt bài viết">
                    <FontAwesomeIcon title="Duyệt bài viết" icon={faCircleChevronLeft} />
                    <div>Duyệt</div>
                </div>
                <div onClick={e => setShowDeleteForm(true)} title="Xoá">
                    <FontAwesomeIcon title="Xoá" icon={faXmark} />
                    <div>Không duyệt</div>
                </div>
            </div>
        )
    }

    if(type === "pending"){
       return <div className={style.postFuncBar}>
            <div onClick={editpost}>
                <FontAwesomeIcon icon={faSquarePen}></FontAwesomeIcon>
                <div>Chỉnh sửa</div>
            </div>
            <div onClick={e => setShowDeleteForm(true)}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                <div>Xoá</div>
            </div>
            <DeleteForm showing={showDeleteForm} id={id} type="bài viêt" closeFunc={setShowDeleteForm} deleteFunc={deletePost}/>
        </div>
    }

    if(type === "user_locked"){
        return <div className={style.postFuncBar}>
             <div onClick={editpost}>
                 <FontAwesomeIcon icon={faSquarePen}></FontAwesomeIcon>
                 <div>Chỉnh sửa</div>
             </div>
             <div>

             </div>
         </div>
     }

    if(type === "approved"){
      return <div className={style.largePostFuncBar}>
            <div onClick={editpost}>
                <FontAwesomeIcon icon={faSquarePen}></FontAwesomeIcon>
                <div>Chỉnh sửa</div>
            </div>
            <div onClick={openPostDetailPage}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                <div>Chi tiết</div>
            </div>
            <div onClick={e => setShowDeleteForm(true)}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                <div>Xoá</div>
            </div>
            <DeleteForm showing={showDeleteForm} id={id} type="bài viêt" closeFunc={setShowDeleteForm} deleteFunc={deletePost}/>
        </div>
    }

    if(type === "admin_approved"){
        return <div className={style.largePostFuncBar}>
              <div onClick={openPostDetailPage}>
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                  <div>Chi tiết</div>
              </div>
              <div></div>
              <div onClick={e => setShowDeleteForm(true)}>
                  <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                  <div>Khoá</div>
              </div>
              <LockForm func={lockPost} showing={showDeleteForm} setShowing={setShowDeleteForm}/>
          </div>
    }

    if(type === "locked_post"){
        return(
            <div className={style2.subPostFuncBar}>
                <DeleteForm showing={showDeleteForm} msg="Bị xoá bởi admin" closeFunc={setShowDeleteForm} deleteFunc={deleteLockedPost}/>
                <div onClick={unLockpost} title="Mở khoá">
                    <FontAwesomeIcon  title="Mở khoá" icon={faLockOpen} />
                    <div>Mở khoá</div>
                </div>
                <div onClick={e => setShowDeleteForm(true)} title="Xoá">
                    <FontAwesomeIcon title="Xoá" icon={faTrash} />
                    <div>Xoá</div>
                </div>
            </div>
        )
    }
    
    if(type === "deleted"){
        return <></>
    }

    return <></>
}

export default PostFuncBar;