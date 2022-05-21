import { useEffect, useState } from "react";
import { sendAuthGetRequest } from "../../util/utils";
import style from "./user.module.css";

const PostStatus = ({account}) =>{

    const [allPost, setAllPost] = useState(0);
    const [lockedPost, setLockedPost] = useState(0);
    const [approvedPost, setApprovedPost] = useState(0);
    const [deletedPost, setDeletedPost] = useState(0);

    useEffect(() =>{
        loadAll();
        loadApproved();
        loadDeleted();
        loadLocked();
    }, []);

    const loadAll = async () =>{
        let res = await sendAuthGetRequest(`/post/count/all/${account}`);
        console.log(res);
        if(res.status === 200){
            setAllPost(res.data);
        }
    }

    const loadLocked = async () =>{
        let res = await sendAuthGetRequest(`/post/locked/count/all/${account}`);
        console.log(res);
        if(res.status === 200){
            setLockedPost(res.data);
        }
    }
    const loadApproved = async () =>{
        let res = await sendAuthGetRequest(`/post/approved/count/all/${account}`);
        if(res.status === 200){
            setApprovedPost(res.data);
        }
    }
    const loadDeleted = async () =>{
        let res = await sendAuthGetRequest(`/post/deleted/count/all/${account}`);
        console.log(res);
        if(res.status === 200){
            setDeletedPost(res.data);
        }
    }

    return (
        <div className={style.postStatus}>
            <div>
                <div>Tổng số bài viết đã tạo</div>
                <div>{allPost}</div>
            </div>
            <div>
                <div>Số bài viết đã được duyệt</div>
                <div>{approvedPost}</div>
            </div>
            <div>
                <div>Số bài viết vi phạm</div>
                <div>{lockedPost}</div>
            </div>
            <div>
                <div>Số bài viết đã xoá</div>
                <div>{deletedPost}</div>
            </div>
        </div>
    )
} 

export default PostStatus;